import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AdoptionRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // Fetching data with React Query
  const { data: RequestedPets = [], refetch } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`Adopted/request/${user.email}`
      );
      return res.data;
    },
  });
  console.log(RequestedPets);
  const handleAccept =(_id,id)=>{
    console.log(_id, id);
    axiosSecure.patch(`adopted/requestedAccept/${_id}/${id}`)
    .then(res=>{
      console.log("working",res.data);
      refetch()
    })
  }
  const handleCancle =(id)=>{
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/Adopted/request/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });  
  }

  return (
    <div>
       <Helmet>
        <title>Lapse-Peat || Adoption Request</title>
        {/* <link rel="canonical" href="https://www.tacobell.com/" /> */}
      </Helmet>
      <div className="my-10">
        <h2 className="text-4xl text-center">All Requsted Pets</h2>
      </div>
      <section className=" px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium ">
            Requester Details{" "}
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {RequestedPets.length} Request
          </span>
        </div>

        <div className="overflow-hidden ">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="">
              <tr>
                <th
                  scope="col"
                  className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                >
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs ml-6 font-semibold uppercase tracking-wide ">
                      No
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                >
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs ml-6 font-semibold uppercase tracking-wide ">
                      Name
                    </span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                >
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs ml-6 font-semibold uppercase tracking-wide ">
                      Email
                    </span>
                  </div>
                </th>

                <th scope="col" className="px-3 py-3 text-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide ">
                      Phone
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide ">
                      Location
                    </span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3 text-start">
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide ">
                      Action
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {RequestedPets.map((manage, i) => (
                <tr key={manage._id}>
                  <td className="size-px px-6 py-3 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="ps-6 lg:ps-3 xl:ps-0 px-6 pe-6 py-3">
                      <div className="flex items-center  gap-x-3">
                        <div>
                          <span className="block text-sm font-semibold ">
                            {manage.RequesterName}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="h-px w-72 whitespace-nowrap">
                    <div className="pl-6 py-3">
                      <span className="block text-sm font-semibold ">
                        {manage.RequesterEmail}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className=" pr-6 py-3">{manage.RequsterNumber}</div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    {manage.RequsterAddress}
                  </td>
                  <td className="size-px px-6 py-1.5 whitespace-nowrap">
                  <button
                    onClick={() => handleAccept(manage._id, manage.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Accept
                  </button>
                  </td>
                  <td className="size-px px-6 py-1.5 whitespace-nowrap">
                  <button
                    onClick={() => handleCancle(manage._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Cancle
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdoptionRequest;
