export type AuthActionResult = {
  error: string | null;
  accountConflict?: {
    providers: Array<{ providerId: string; displayName: string }>;
    type: "signup_account_exists" | "signin_no_credential";
  };
};
