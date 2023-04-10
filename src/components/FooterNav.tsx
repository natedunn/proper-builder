export const FooterNav = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div class='py-6 text-center'>
      © 2022—{currentYear} Proper is made by{' '}
      <a class='link underline' href='https://natedunn.net'>
        Nate Dunn
      </a>
    </div>
  );
};
