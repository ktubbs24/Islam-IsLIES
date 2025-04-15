
import SearchDialog from "./SearchDialog";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex flex-1 items-center justify-end">
        <div className="w-[300px]">
          <SearchDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
