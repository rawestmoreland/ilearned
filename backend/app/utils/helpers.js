const getBaseURL = () => {
  return `${process.env.NEXT_SBB_PUBLIC_URL || "http://localhost:3000"}`;
};

module.exports = { getBaseURL };
