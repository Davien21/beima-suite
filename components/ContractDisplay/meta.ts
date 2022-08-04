export const waitlistAction = (onAction: Function) => {
  return {
    btnText: "Join Waitlist",
    content:
      "Thank you for publishing your documentation. It’s still cooking. Join our waitlist to be among the first to receive a link to the preview.",
    onAction,
    title: "Yay! You Made It",
  };
};

export const signUpAction = (onAction: Function) => {
  return {
    btnText: "Sign In",
    content:
      "We noticed you aren't signed in yet. Please sign in to use this feature.",
    onAction,
    title: "Hey Champ",
  };
};
