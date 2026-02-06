import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaSave } from 'react-icons/fa';
import { ProfileFormData } from '../_types/profile';
import Input from './Input';

export interface UserProfileFormProps {
  register: UseFormRegister<ProfileFormData>
  errors: FieldErrors<ProfileFormData>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function UserProfileForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  onCancel,
}: UserProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-(--font-color) mb-2">

          Username
        </label>
        <Input
          type="text"
          id="username"
          {...register("username")}
          error={errors.username?.message}
          placeholder="Enter your username"
          className="w-full"
          disabled={isSubmitting}
        />

      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-(--font-color) mb-2">

          Email Address
        </label>
        <Input
          type="email"
          id="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="you@example.com"
          className="w-full"
          disabled={isSubmitting}
        />

      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 primary-btn text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-(--font-color) rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>


    </form>
  )
}
