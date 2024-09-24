const Footer = () => {
  return (
    <footer className="text-gray-400 pt-3 flex flex-col sm:flex-row justify-center items-center sm:space-x-5 space-y-3 sm:space-y-0 text-center">
      <div className="flex items-center space-x-1 text-sm">
        <span>© {new Date().getFullYear()}</span>
        <span>|</span>
        <span>All rights reserved</span>
      </div>
      <div className="text-sm">
        Created by{' '}
        <span className="font-semibold text-gray-600">Mohit Bhandari</span>
      </div>
    </footer>
  );
};

export default Footer;
