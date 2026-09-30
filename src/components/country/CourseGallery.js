

const DEFAULT_IMAGES = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
];

function chunkIntoColumns(images, columnCount) {
  const perColumn = Math.ceil(images.length / columnCount);
  return Array.from({ length: columnCount }, (_, i) =>
    images.slice(i * perColumn, i * perColumn + perColumn)
  );
}

export default function CourseGallery({ images = DEFAULT_IMAGES, label = "Course" }) {
  const columns = chunkIntoColumns(images, 4);
  let flatIndex = 0;

  return (
    <div className="px-5 py-10 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-4 gap-2 sm:gap-4">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="grid gap-2 sm:gap-4">
            {col.map((src, i) => {
              const delay = flatIndex * 70;
              flatIndex += 1;
              return (
                <div
                  key={i}
                  className="course-gallery-item group overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${label} gallery photo ${colIndex * col.length + i + 1}`}
                    className="h-auto w-full scale-100 object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}