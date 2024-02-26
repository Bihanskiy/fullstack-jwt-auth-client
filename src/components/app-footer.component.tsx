
const AppFooter = ({ }): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-4 bg-slate-300/30 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <h4 className="text-lg font-bold">
          Authorization
        </h4>
        <p className="text-base font-medium">{`by Bihanskyi ${currentYear}`}</p>
      </div>
    </div>
  )
}

export default AppFooter;