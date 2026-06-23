// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'

// import { stripe } from '../../../lib/stripe'

// export async function POST() {
  
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: "price_1Tl40pJt9f94pS7YQft8xVFa",
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       metadata: {},
//       success_url: `${origin}/all-classes/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }






import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
 
import { stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'

import { getClassById } from '@/lib/api/classes'
import { checkPurchase } from '@/lib/api/purchases'
 
export async function POST(req) {
  try {
    const { classId } = await req.json()
    if (!classId) {
      return NextResponse.json({ error: 'classId is required' }, { status: 400 })
    }
 
    const user = await getUserSession()
    if (!user?.email) {
      return NextResponse.json({ error: 'Please sign in to purchase.' }, { status: 401 })
    }
 
    const book = await getClassById(classId)
    if (!book || book.error) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }
 
    if (book.authorEmail === user.email) {
      return NextResponse.json({ error: "You can't buy your own ebook." }, { status: 400 })
    }
 
    const { purchased } = await checkPurchase(classId, user.email)
    if (purchased) {
      return NextResponse.json({ error: 'You already own this ebook.' }, { status: 400 })
    }
 
    const origin = (await headers()).get('origin')
 
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(Number(book.price) * 100),
            product_data: { name: book.title },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/books/${classId}`,
      metadata: {
        classId,
        buyerEmail: user.email,
        buyerName: user.name || '',
      },
    })
 
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout session error:', err)
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
  }
}

