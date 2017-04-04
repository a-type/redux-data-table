import lipsum from 'lorem-ipsum';

const randomTime = () => {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    Math.max(now.getMonth() - (Math.floor(Math.random() * 2)), 0),
    Math.max(now.getDate() - (Math.floor(Math.random() * 10)), 0),
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60),
    Math.floor(Math.random() * 60),
    Math.floor(Math.random() * 1000)
  );
};

export default new Array(1000).fill(0).map((_, index) => ({
  id: index,
  name: `User ${Math.floor(Math.random() * 10000)}`,
  lastLogin: randomTime(),
  bio: lipsum({ count: 1, units: 'sentences' }),
}));