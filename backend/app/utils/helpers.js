const getBaseURL = () => {
  return `${process.env.NEXT_ILEARNED_PUBLIC_URL || 'http://localhost:3000'}`;
};

module.exports = { getBaseURL };
