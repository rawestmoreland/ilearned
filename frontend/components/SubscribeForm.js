import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../utils/context/modal-context';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import SignupResponseModal from './modals/SignupResponseModal';

const SubscribeForm = () => {
  const { setModal } = useModal();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = useCallback(
    async data => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
      executeRecaptcha('subscribeFormSubmit').then(gReCaptchaToken => {
        submitSubForm(data.email, gReCaptchaToken);
      });
    },
    [executeRecaptcha],
  );

  const submitSubForm = async (email, captchaCode) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        const responseJson = await response.json();
        if (responseJson.status === 'success') {
          setModal(
            <SignupResponseModal
              buttonText="ok"
              handleModalToggle={() => setModal()}
              title="Email confirmation sent"
              details="An email confirmation has been sent. Please check your email and confirm."
            />,
          );
        } else alert("I think you're a robot. Sorry.");
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      const errorMessage = !error?.message
        ? 'Something went wrong'
        : error?.message === 'This attribute must be unique'
        ? 'This email address is already registered'
        : error?.message;
      setModal(
        <SignupResponseModal
          buttonText="ok"
          handleModalToggle={() => setModal()}
          title="uh oh"
          details={errorMessage}
        />,
      );
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="flex">
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col">
        <input
          type="email"
          {...register('email', { required: true })}
          className="block w-full rounded-md p-2 border h-8 md:h-10 max-h-12 border-gray-300 shadow-sm focus:border-prussian-blue focus:ring-prussian-blue sm:text-sm"
          placeholder="Enter your email"
        />
        {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
      </div>

      <button
        type="submit"
        className="ml-4 flex items-center justify-center rounded-md h-8 md:h-10 max-h-10 border border-transparent bg-terracotta px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-oxford-blue focus:outline-none focus:ring-2 focus:ring-mikado-yellow focus:ring-offset-2"
      >
        Subscribe
      </button>
    </form>
  );
};

export default SubscribeForm;
