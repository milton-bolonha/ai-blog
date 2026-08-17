import { SignOutButton } from "@clerk/nextjs";
import { useLanguage } from '@/contexts/LanguageContext';

export function CustomSignOutButton() {
  const { t } = useLanguage();

  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        {t('auth.signOut')}
      </button>
    );
  }

  return (
    <SignOutButton>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        {t('auth.signOut')}
      </button>
    </SignOutButton>
  );
}
