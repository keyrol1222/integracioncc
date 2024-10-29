import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
  TESelect,
} from "tw-elements-react";
import { getStateRent, states } from "../../Utils/helpers";
import * as XLSX from "xlsx";
import { useApiData } from "../../Services/actions";
type item = {
  id: number;
  type: string;
  doc: number;
  date: string;
  user: number;
  amount: number;
  number: string;
};
function Rent() {
  const [showModal, setShowModal] = useState(false);
  const [ShowValidation, setShowValidation] = useState(false);
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState<item>({
    amount: 0,
    type: "",
    doc: 0,
    user: 0,
    id: 0,
    date: "",
    number: "",
  });
  const [filter, setFilter] = useState<any>({
    amount: 0,
    type: "",
    doc: 0,
    user: 0,
    id: 0,
    date: "",
    number: "",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [Inspeccions, setInspeccions] = useState([]);
  const [currentCLient, setCurrentClient] = useState<any>({});
  const [LimitExceeded, setLimitExceeded] = useState(false);
  const [mode, setMode] = useState("create");
  const useApi = useApiData("rents");
  const useApiUsers = useApiData("users");
  const useApiCars = useApiData("cars");
  const useApiInspeection = useApiData("inspections");
  React.useEffect(() => {
    useApiUsers.callApi();
    useApi.callApi();
    useApiCars.callApi();
  }, []);
  React.useEffect(() => {
    if (useApi.data) {
      setFilteredData(useApi.data);
    }
  }, [useApi.data]);
  React.useEffect(() => {
    if(selected.user){
      const user = useApiUsers.data.find((e: any) => e.id === +selected.user);
      setCurrentClient(user);
    }
  }, [selected.user]);
  React.useEffect(() => {
    if (useApiInspeection.data) {
      setInspeccions(useApiInspeection.data);
    }
  }, [useApiInspeection.data]);
  useEffect(() => {
    // const applyFilter = (item: {
    //   id: number;
    //   amount: number;
    //   days: number;
    //   comment: string;
    //   state: number;
    //   user: { id: number; name: string; lastName: string; dni: string; email: string; type: string };
    // }) => {
    //   return (
    //     (filter.state === 0 || item.state === filter.state) &&
    //     (filter.user === 0 || item.user.id === filter.user) &&
    //     (filter.amount === 0 ||
    //       `${item.amount}`.includes(`${filter.amount}`)) &&
    //     (filter.days === 0 || `${item.days}`.includes(`${filter.days}`))
    //   );
    // };

    // const filtered =
    //   filter.state !== 0 ||
    //   filter.user !== 0 ||
    //   filter.amount !== 0 ||
    //   filter.days !== 0 ||
    //   filter.type !== ""
    //     ? useApi.data.filter(applyFilter)
    //     : useApi.data;

    // setFilteredData(filtered);
  }, [filter]);
  React.useEffect(() => {
    if (useApiUsers.data) {
      const filtered = useApiUsers.data.filter((e: any) => e.state === "1");
      setUsers(
        filtered.map((item: any) => {
          return { text: item.name, value: item.id };
        })
      );
    }
  }, [useApiUsers.data]);
  React.useEffect(() => {
    if (useApiCars.data) {
      const filtered = useApiCars.data.filter((e: any) => e.state === "1");
      setCars(
        filtered.map((item: any) => {
          return { text: item.desc, value: item.id };
        })
      );
    }
  }, [useApiCars.data]);
  const formatDate = (date: string) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  };
  // const exportToExcel = () => {
  //   const formattedData = filteredData.map(
  //     (item: {
  //       id: any;
  //       amount: any;
  //       days: any;
  //       comment: any;
  //       state: any;
  //       user: { name: any; lastName: any; dni: any; email: any; type: any };
  //     }) => ({
  //       ID: item.id,
  //       "Fecha de Alquiler": new Date(item.rentDate).toLocaleDateString(
  //         "es-ES"
  //       ),
  //       "Fecha de Devolución": item.returnDate
  //         ? new Date(item.returnDate).toLocaleDateString("es-ES")
  //         : "",
  //       Monto: item.amount,
  //       Días: item.days,
  //       Comentario: item.comment,
  //       Estado: item.state,
  //       "Empleado Nombre": `${item.employee.name} ${item.employee.lastName}`,
  //       "Empleado DNI": item.employee.dni,
  //       "Empleado Horario": item.employee.workTime,
  //       "Empleado Email": item.employee.email,
  //       "Carro Descripción": item.car.desc,
  //       "Carro Chasis": item.car.chasis,
  //       "Carro Motor": item.car.motor,
  //       "Carro Placa": item.car.plate,
  //       "Carro Tipo": item.car.type.desc,
  //       "Carro Marca": item.car.brand.desc,
  //       "Carro Modelo": item.car.model.desc,
  //       "Carro Combustible": item.car.fuel.desc,
  //       "Usuario Nombre": `${item.user.name} ${item.user.lastName}`,
  //       "Usuario DNI": item.user.dni,
  //       "Usuario Email": item.user.email,
  //       "Usuario Tipo": item.user.type,
  //     })
  //   );

  //   const worksheet = XLSX.utils.json_to_sheet(formattedData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

  //   XLSX.writeFile(workbook, "reporte.xlsx");
  // };

  return (
    <>
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Crear
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
              <form>
                <div className="grid grid-cols-2 gap-4">
                <TESelect
                    data={[
                      {
                        value: 0,
                        text: "seleccionar cliente",
                      },
                      ...users,
                    ]}
                    label="Cliente"
                    value={selected.user}
                    onValueChange={(e: any) => {
                      setLimitExceeded(false);
                      
                      if (e) {
                        setSelected({ ...selected, user: e.value, amount: 0});
                      }
                    }}
                  />
                  
                  <TESelect
                    data={[
                      {
                        value: 0,
                        text: "seleccionar",
                      },
                    ]}
                    label="Tipo de Movimiento"
                    value={selected.type}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, type: e.value });
                      }
                    }}
                  />
                  <TESelect
                    data={[
                      {
                        value: 0,
                        text: "seleccionar",
                      },
                    ]}
                    label="Documento"
                    value={selected.type}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, doc: e.value });
                      }
                    }}
                  />
                  <TEInput
                    type="number"
                    label="Monto"
                    max={currentCLient.creditLimit || 0}
                    min={0}
                    onChange={(e) => {
                      setLimitExceeded(false);
                      if(+e.target.value > currentCLient.creditLimit){
                        setLimitExceeded(true);
                      }
                      setSelected({ ...selected, amount: +e.target.value });
                    }}
                    value={selected.amount}
                    className="mb-6"
                  ></TEInput>

                  <TEInput
                    type="date"
                    label="Fecha"
                    onChange={(e) => {
                      setSelected({ ...selected, date: e.target.value });
                    }}
                    value={selected.date}
                    className="mb-6"
                  ></TEInput>

                  <TEInput
                    type="text"
                    label="Numero"
                    onChange={(e) => {
                      setSelected({ ...selected, number: e.target.value });
                    }}
                    value={selected.number}
                    className="mb-6"
                  ></TEInput>
  
                 
                </div>
                    {
                      LimitExceeded && (
                        <div className="text-red-500 text-xs">
                          El monto excede el limite de credito
                        </div>
                      )
                    }
                <TERipple rippleColor="light" className="w-full mt-2">
                  <button
                    type="button"
                    disabled={
                      selected.amount === 0 ||
                      selected.user === 0 ||
                      LimitExceeded
                    }
                    onClick={() => {
                      if (
                        selected.amount === 0 ||
                        selected.user === 0 ||
                        LimitExceeded
                      ) {
                        alert("Debe llenar todos los campos");
                      } else {
                        if (mode === "create") {
                         
                          const employeeId =
                            localStorage.getItem("userId") || 0;
                          const data = {
                            state: "3",
                            amount: selected.amount,
                            employee: +employeeId,
                            user: selected.user,
                            rentDate: new Date().toISOString(),
                            returnDate: "",
                          };
                          useApi.postData(data, () => {
                            setSelected({
                              number: "",
                              amount: 0,
                              user: 0,
                              id: 0,
                              date: "",
                              type: "",
                              doc: 0,
                            });
                            setShowModal(false);
                            useApi.callApi();
                          });
                        } else {
                          if (mode === "edit") {
                            console.log("edit", selected);
                            const data = {};
                            useApi.putData(selected.id, data, () => {
                              setSelected({
                              
                              amount: 0,
                              user: 0,
                              id: 0,
                              date: "",
                              type: "",
                              doc: 0,
                              number: "",
                              });
                              setShowModal(false);
                              useApi.callApi();
                            });
                          }
                        }
                      }
                    }}
                    className="block w-full rounded disabled:opacity-70 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]]"
                  >
                    {mode === "create" ? "Crear" : "Editar"}
                  </button>
                </TERipple>
              </form>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

      <Layout>
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Transacciones
            </h1>
          </div>
        </header>
        <div className="m-2">
          <button
            type="button"
            onClick={() => {
              setSelected({
               
                              amount: 0,
                              user: 0,
                              id: 0,
                              date: "",
                              type: "",
                              doc: 0,
                              number: "",
              });
              setMode("create");
              setShowModal(true);
            }}
            className=" my-2 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          >
            Agregar
          </button>
          {/* create selects to filter the table */}
          {/* <div className="grid grid-cols-3 gap-4">
            <TESelect
              data={states}
              label="Estado"
              value={filter.state}
              onValueChange={(e: any) => {
                if (e) {
                  setFilter({ ...filter, state: e.value });
                }
              }}
            />
            <TESelect
              data={[
                {
                  value: 0,
                  text: "seleccionar carro",
                },
                ...users,
              ]}
              label="Cliente"
              value={filter.user}
              onValueChange={(e: any) => {
                if (e) {
                  setFilter({ ...filter, user: e.value });
                }
              }}
            />
            <TESelect
              data={[
                {
                  value: 0,
                  text: "seleccionar cliente",
                },
                ...cars,
              ]}
              label="Vehiculo"
              value={filter.car}
              onValueChange={(e: any) => {
                if (e) {
                  setFilter({ ...filter, car: e.value });
                }
              }}
            />
            <TEInput
              type="number"
              label="Monto"
              onChange={(e) => {
                setFilter({ ...filter, amount: +e.target.value });
              }}
              value={filter.amount}
              className="mb-6"
            ></TEInput>
            <TEInput
              type="number"
              label="Dias"
              onChange={(e) => {
                setFilter({ ...filter, days: +e.target.value });
              }}
              value={filter.days}
              className="mb-6"
            ></TEInput>
            <TEInput
              type="text"
              label="Comentarios"
              onChange={(e) => {
                setFilter({ ...filter, comment: e.target.value });
              }}
              value={filter.comment}
              className="mb-6"
            ></TEInput>
            
            <TEInput
              type="date"
              label="Fecha de renta"
              onChange={(e) => {
                setFilter({ ...filter, rentDate: e.target.value });
              }}
              value={filter.rentDate}
              className="mb-6"
            ></TEInput>
            <TEInput
              type="date"
              label="Fecha de devolución"
              
              onChange={(e) => {
                setFilter({ ...filter, returnDate: e.target.value });
              }}
              value={filter.returnDate}
              className="mb-6"
            ></TEInput>
          </div> */}
          <div className="m-2">
            {/* <button
              type="button"
              onClick={exportToExcel}
              className=" my-2 inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
              Exportar a CSV
            </button> */}
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                      <th scope="col" className="px-6 py-4">
                          Id
                        </th>
                        <th scope="col" className="px-6 py-4">
                          monto
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Numero
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(filteredData || []).map((row: any) => (
                        <tr
                          key={row.id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.amount}
                          </td>
                          
                          <td className="whitespace-nowrap px-6 py-4">
                          {row.number}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                          {row.Date}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                           {
                            row.state != 4 ? ( <button
                              type="button"
                              onClick={() => {
                                setShowValidation(true);
                                setSelected({
                                  number: row.number,
                                  amount: row.amount,
                                  user: row.user.id,
                                  id: row.id,
                                date: row.rentDate,
                                type: row.type,
                                doc: row.doc,
                                });
                              }}
                              className="inline-block rounded-full bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
                              Devolver
                            </button>) : null
                           }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Rent;
