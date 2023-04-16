export const FooterNav = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div class='py-6 text-center'>
      © 2019 — {currentYear} Proper is built by{' '}
      <a class='link underline' href='https://natedunn.net'>
        Nate Dunn
      </a>
    </div>
  );
};
