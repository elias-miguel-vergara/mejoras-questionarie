export const ResourcesContainer = ({
  resources,
  title,
}: {
  resources?: { name: string; link: string }[]
  title?: string
}) => {
  return (
    <div className="flex mt-2 flex-col ">
      {title && <p className="mt-4 text-lg font-bold ">{title}</p>}
      <div className="flex pl-8 mt-2">
        {!!resources?.length ? (
          <ul style={{ listStyleType: 'disc' }}>
            {resources.map((resource, index) => (
              <li key={index}>
                <a
                  target="_blank"
                  className="hover:text-[purple]"
                  href={resource.link}
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <>No Resources Found</>
        )}
      </div>
    </div>
  )
}
