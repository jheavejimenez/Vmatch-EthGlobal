export default function PersonalInfo({ title, info }) {
  return (
    <div className="mb-16 flex w-full flex-col items-center justify-center space-y-2 border-b">
      <p className="text-gray-500">{title}</p>
      <p className="pb-2">{info}</p>
    </div>
  )
}
