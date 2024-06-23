export default () => {
  return {
    inputStyle:
      "peer hover:z-10 focus-within:z-10 hover:bg-transparent placeholder:text-transparent relative px-2.5 py-1.5 md:px-3 md:py-2.5 rounded-lg block w-full focus:outline-none border-b-2 border-slate-400 bg-slate-50 text-gray-900 focus:ring-1 focus:ring-blue-200 selection:bg-blue-200",
    labelStyle:
      "peer peer-hover:z-0 peer-focus-within:z-0 absolute -top-6 text-sm peer-placeholder-shown:left-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 text-slate-700 peer-placeholder-shown:text-slate-400 peer-focus-within:left-0 peer-focus-within:text-sm peer-focus-within:-top-6 peer-focus-within:text-slate-700 transition-all duration-300",
  };
};
