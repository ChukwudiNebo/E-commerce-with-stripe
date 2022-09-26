// import React from 'react';
// import { useRouter } from 'next/router';

// const dollarsToCentsMultiplier = 100;

// const useStripeSessionWithUserInfo = () => {
//   const [isPending, setIsPending] = React.useState(false);
//   const router = useRouter();

//   const handleSubmit = async ({ name, email, amount }) => {
//     setIsPending(true);

//     const response = await fetch('/api/create-stripe-session', {
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         amount: amount * dollarsToCentsMultiplier,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//     });

//     const result = await response.json();

//     setIsPending(false);
//     router.push(result.url);
//   };

//   return [handleSubmit, isPending];
// };

// export default useStripeSessionWithUserInfo;






// import { StatusCodes } from 'http-status-codes';

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function stripeCheckoutSessionCreate(req, res) {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: `Help ${req.body.cause}`,
//           },
//           unit_amount: req.body.amount,
//         },
//         quantity: 1,
//       },
//     ],
//     metadata: {
//       cause: `Help ${req.body.cause}`,
//     },
//     // mode: 'subscription',
//     mode: 'payment',
//     success_url: process.env.SUCCESS_URL,
//     cancel_url: process.env.CANCEL_URL,
//     customer_email: req.body.email,
//   });

//   res.status(StatusCodes.OK).json({ url: session.url });
// }




//  import React from 'react';
// import clsx from 'clsx';

// import InputFormControl from './form/InputFormControl';
// import Modal from './Modal';
// import useStripeSessionWithUserInfo from '../hooks/useStripeSessionWithUserInfo';

// export default function MainDonation() {
//   const [modalText, setModalText] = React.useState('');
//   const [isModalOpen, setModalOpen] = React.useState(false);
//   const [amount, setAmount] = React.useState(0);
//   const [email, setEmail] = React.useState('');
//   const [name, setName] = React.useState('');
//   const [handleSubmit, isPending] = useStripeSessionWithUserInfo();

//   const hideModal = () => setModalOpen(false);

//   const showModal = (message) => {
//     setModalText(message);
//     setModalOpen(true);
//   };

//   const handleSubmitForm = async (event) => {
//     event.preventDefault();

//     if (!name) {
//       showModal('Please choose a name');
//       return;
//     }
//     if (!email) {
//       showModal('Please choose an email');
//       return;
//     }
//     if (!amount) {
//       showModal('Please choose an amount to give');
//       return;
//     }

//     await handleSubmit({ name, email, amount });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmitForm}>
//         <div className="p-6  bcolor mb-5 card  bg-base-100 space-y-3 text-black">
//           <h2 className="card-title text-color" data-theme="light">
//             {'Give Today'}
//           </h2>
//           <label className="input-labelText"> {'Name'}</label>
//           <InputFormControl
//             className="input-color"
//             id="name"
//             onChange={setName}
//             value={name}
//           />
//           <label className="input-labelText"> {'Email'}</label>
//           <InputFormControl
//             className="input-color"
//             id="email"
//             onChange={setEmail}
//             value={email}
//           />

//           <label className="input-labelText"> {'Amount'}</label>
//           <InputFormControl
//             className="input-color"
//             id="amount"
//             onChange={setAmount}
//             value={amount}
//           />
//           <div className="pb-5" />
//           <button
//             aria-label="donate-btn"
//             type="submit"
//             className={clsx('btn-accent rounded-none  m-5', {
//               loading: isPending,
//             })}
//           >
//             {'Donate Now'}
//           </button>
//         </div>
//       </form>
//       <Modal isOpen={isModalOpen} onClose={hideModal}>
//         {modalText}
//       </Modal>

//       <style jsx>{`
//         .bcolor {
//           background: rgba(26, 30, 30, 0.48);
//           box-shadow: 4px 4px 17px rgba(0, 0, 0, 0.25);
//           border-radius: 9px;
//           border-color: rgba(0, 0, 0, 0.25);
//         }

//         .text-color {
//           font-family: 'Roboto';
//           font-style: normal;
//           font-weight: 400;
//           font-size: 36px;
//           line-height: 42px;
//           color: #ffffff;
//         }

//         .input-labelText {
//           text-align: left;
//           color: #ffffff;
//         }

//         .input-color {
//           background: #f7f7f7;
//           opacity: 0.7;
//           border-radius: 2px;
//         }
//       `}</style>
//     </>
//   );
// }


// import Image from 'next/image';
// import React from 'react';

// import MainDonation from './MainDonation';

// function HeroSectionModified({ main = false, image, inNeed = false }) {
//   return (
//     <div className={`text-center ${!main && 'hero-content'} md:m-auto`}>
//       {main && (
//         <div className="hero-image-container">
//           <Image
//             alt="Background"
//             className="hero-image"
//             layout="fill"
//             objectFit="cover"
//             src={image}
//           />
//         </div>
//       )}
//       <div className={main && 'hero'}>
//         <div className="w-lg p-5">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 gap-y-5 items-center">
//             {!main && (
//               <div className="md:col-span-1">
//                 <Image
//                   alt="Margarita Humanitarian Foundation"
//                   height={180}
//                   src="/images/MHF-Color-300x300.png"
//                   width={180}
//                 />
//               </div>
//             )}
//             {main && <div className="bg-image-filter" />}
//             <div className={`md:col-span-${main ? '2' : 1} p-10 z-10`}>
//               <h1
//                 className={`text-3xl ${
//                   main && 'md:text-5xl text-white '
//                 } font-extrabold m-4 max-w-lg`}
//               >
//                 {'Help A Family Today'}
//               </h1>
//               <p
//                 className={`md:text-xl m-5 ${
//                   main && 'text-white text-opacity-90'
//                 } leading-tight max-w-lg`}
//               >
//                 {
//                   'Many families are struggling to pay their bills and put food on the table. Help out today in the community.'
//                 }
//               </p>
//             </div>
//             <div
//               className={`${!main && 'sm:col-span-2 '} md:col-span-1 max-w-md`}
//             >
//               <MainDonation inNeed={inNeed} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .bg-image {
//           z-index: -10;
//         }
//         .bg-image-filter {
//           position: absolute;
//           z-index: 0;
//           top: 80px;
//           left: 0;
//           min-height: 85vh;
//           width: 100%;
//           background: linear-gradient(
//             to right bottom,
//             rgba(54, 38, 9, 0.6),
//             rgba(20, 81, 116, 0.3)
//           );
//           object-fit: cover;
//         }
//         .hero {
//           min-height: 85vh;
//         }
//         .hero-image-container {
//           min-height: 85vh;
//           width: 100%;
//           position: absolute;
//           z-index: 0;
//         }
//         .hero-image {
//           position: relative;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default HeroSectionModified;


// import PropTypes from 'prop-types';
// import React from 'react';

// import Footer from './Footer';
// import HeroSectionModified from './HeroSectionModified';
// import Navbar from './Navbar';
// import { useContextTheme } from './ThemeContext';

// export default function PrimaryLayout({ main = false, image, children }) {
//   const { backgroundColor, textColor } = useContextTheme();
//   return (
//     <>
//       <div className={`flex flex-col min-h-screen ${backgroundColor}`}>
//         <Navbar />
//         <main className={`flex-grow ${backgroundColor} text-${textColor}`}>
//           <HeroSectionModified image={image} main={main} />
//           {children}
//         </main>
//         <Footer />
//       </div>
//     </>
//   );
// }

// PrimaryLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };
