import {
  CogIcon,
  DatabaseIcon,
  CashIcon,
  ChipIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  DesktopComputerIcon,
} from '@heroicons/react/solid'

const features = [
  {
    name: 'Lens Protocol',
    description: 'Profile IDs, Social Media Functionality',
    icon: GlobeAltIcon,
  },
  {
    name: 'Livepeer',
    description: 'Public Livestreams & private Livechat with matches',
    icon: VideoCameraIcon,
  },
  {
    name: 'Polygon',
    description: 'Fees & payment medium for content/tips',
    icon: ChipIcon,
  },
  {
    name: 'Moralis',
    description: 'Backend & data management',
    icon: DatabaseIcon,
  },
  {
    name: 'NextJS',
    description: 'Frontend',
    icon: CogIcon,
  },
  {
    name: 'Tailwind Css',
    description: 'Frontend',
    icon: DesktopComputerIcon,
  },
]

export default function Feature() {
  return (
    <div>
      <div className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base font-semibold uppercase tracking-wider text-cyan-400">
            LFGrow - Eth Global Hackathon
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Tech Stack for this Application
          </p>
          <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
            These are the protocols and services we are using for VMatch.
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-400 p-3 shadow-lg">
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
