const BlogSection = () => {
  return (
    <div className=" w-11/12 max-w-maxContent mx-auto    pb-12">
      <div className="  mx-auto   ">
        {/* Blogs Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold   mb-8">Latest Blog Posts</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Blog Post 1 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-xs w-full">
              <h3 className="text-lg font-semibold text-white mb-4">
                5 Books to Read in 2025
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Check out these top picks for books to read in 2025. Our curated
                list covers fiction, non-fiction, and everything in between.
              </p>
              <a
                href="/blog/5-books-to-read-2025"
                className="text-yellow-400 hover:text-yellow-600 transition-all duration-300 ease-linear"
              >
                Read More →
              </a>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-xs w-full">
              <h3 className="text-lg font-semibold text-white mb-4">
                How to Stay Motivated to Read More
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Discover simple and effective strategies to stay motivated to
                read, no matter your schedule or life demands.
              </p>
              <a
                href="/blog/how-to-stay-motivated"
                className="text-yellow-400 hover:text-yellow-600 transition-all duration-300 ease-linear"
              >
                Read More →
              </a>
            </div>

            {/* Blog Post 3 */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-xs w-full">
              <h3 className="text-lg font-semibold text-white mb-4">
                The Rise of E-books: What You Need to Know
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                The digital reading landscape is changing fast. Learn about the
                growing popularity of e-books and how it’s shaping the future of
                reading.
              </p>
              <a
                href="/blog/rise-of-ebooks"
                className="text-yellow-400 hover:text-yellow-600 transition-all duration-300 ease-linear"
              >
                Read More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
