function Story({ img }) {
  return (
    <div>
      <img
        src={img}
        className="h-14 w-14 rounded-full p-[1.5px] cursor-pointer border-red-500 border-2 object-contain hover:scale-105 hover:transition-all"
        alt="user-avatar"
      />
      <p className="text-xs w-14 text-center truncate"></p>
    </div>
  );
}

export default Story;
