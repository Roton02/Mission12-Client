import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";

const Listing = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [listingData, setListingData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    axiosPublic.get(`/allCategory?search=${search}`).then((res) => {
      setListingData(res.data);
      setSelectedData(res.data);
    });
  }, [axiosPublic, search]);
  console.log(selectedData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setSearch(form.serching.value);
  };
  const handleCategory = (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log(form.value);
    const selected = form.value;
    const remainingBySelected = selectedData.filter((s) => s.type === selected);
    console.log(remainingBySelected);
    setListingData(remainingBySelected);
  };
  return (
    <div>
      <Helmet>
        <title>Lapse-Peat || Listing</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
      <header>
        <div
          className={`w-screen h-[200px]  mx-auto rounded-b-md bg-gradient-to-r from-[#F9F3F0] from-10% via-[#FCE7DC] via-30% to-[#F9F3F0] to-90% dark:bg-gradient-to-r dark:from-[#f2f2d8] dark:from-10% dark:via-[#FCE7DC] dark:via-30% dark:to-[#fae1d4]
         `}
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl pt-5 text-center  font-bold mb-5 text-[#393d72] ">
              ----Adoption Search----
            </h1>
            <p className="w-36 border-b-4 border-[#393d72] mx-auto"> </p>
            <p className="text-center py-3">
              You can find peats and also can adopted peats
            </p>
          </div>
        </div>
      </header>
      <div className="  bg-slate-50  border">
        <div
          className="md:px-32 p-5   max-w-7xl mx-auto
       mt-1  flex flex-col lg:flex-row items-center justify-between"
        >
          <form onSubmit={handleSubmit}>
            <div className="relative z-10 flex  space-x-2  py-5  rounded-lg  text-neutral-200">
              <div className="">
                <input
                  type="text"
                  name="serching"
                  className="py-2.5 border md:w-96 px-4 block   rounded-lg bg-white  border-gray-600 text-black"
                  placeholder="Search by peat Name And get the peat details !"
                />
              </div>

              <div className="flex-[0_0_auto] ">
                <button
                  type="submit"
                  className="size-[46px] text-sm md:w-52 w-20 inline-flex justify-center items-center gap-x-2  font-semibold rounded-lg border border-transparent  text-white  bg-[#ff4880] disabled:opacity-50 disabled:pointer-events-none"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="w-52">
            <select
              onChange={handleCategory}
              name="category"
              className="select select-secondary w-full max-w-xs"
            >
              <option disabled selected value="">
                Find By Category name
              </option>
              <option value="Cat">cats</option>
              <option value="Dog">Dog</option>
              <option value="Rabbit">Rabbite</option>
            </select>
          </div>
        </div>
      </div>

      <div className=" max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 md:gap-5 gap-5 mt-10 items-center  ">
        {listingData.length === 0
          ? // Render skeleton loaders while data is loading
            Array(9) // Render 9 skeleton cards (adjust as per your grid layout)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  <Skeleton
                    width={300}
                    height={10}
                    count={5}
                    style={{ marginBottom: "px" }}
                  />
                </div>
              ))
          : // Render actual data
            listingData.map((list) => (
              <Link key={list._id} to={`/singlePage/${list._id}`}>
                <div className=" w-full ">
                  <a
                    href="#"
                    className="w-full  h-60 group relative block bg-black"
                  >
                    <img
                      alt="Something is wrong"
                      src={list.img}
                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                    />

                    <div className="relative p-4 sm:p-6 lg:p-8">
                      <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                        {list.date}
                      </p>

                      <p className="text-xl font-bold text-white sm:text-2xl">
                        {list.name}
                      </p>

                      <div className="mt-20">
                        <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="text-sm text-white">
                            {list.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Listing;
