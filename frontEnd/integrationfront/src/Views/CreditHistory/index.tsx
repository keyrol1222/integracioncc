import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEInput,
  TESelect,
} from "tw-elements-react";
import helpers from "../../Utils/helpers";
import { useApiData } from "../../Services/actions";

type item = {
  id: number;
  cedula: string;
  rnc: string;
  concepto: string;
  fecha: string;
  montoTotal: number
};
function CreditHistory() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<item>({
    id: 0,
    cedula: "",
    rnc: "",
    concepto: "",
    fecha: "",
    montoTotal: 0,
  });
  const [mode, setMode] = useState("create");
  const [document, setDocument] = useState("");
  const [data, setData] = useState<item|undefined>(undefined);
  const [ShowCedulaError, setShowCedulaError] = useState(false);
  const useApi = useApiData("Accounting");
  
  const handleSearch = async () => {
    await useApi.getData(document);
  }

  useEffect(() => {
    if (!useApi.loading) {
      setData(useApi.data);
    }
  },[useApi.loading])

  React.useEffect(() => {
    setShowCedulaError(false);
    if (selected.cedula && selected.cedula.length === 11) {
      useApi.validateCedula(selected.cedula, (res) => {
        if(res.valid === false){
          setShowCedulaError(true);
        }
      });
    }
  }, [selected.cedula]);

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
                  <TEInput
                    type="text"
                    label="Cedula"
                    onChange={(e) => {
                      setSelected({ ...selected, cedula: e.target.value });
                    }}
                    value={selected.cedula}
                    className="mb-6"
                  ></TEInput>

                  <TEInput
                    type="text"
                    label="RNC"
                    onChange={(e) => {
                      setSelected({ ...selected, rnc: e.target.value });
                    }}
                    value={selected.rnc}
                    className="mb-6"
                  ></TEInput>

                  <TEInput
                    type="text"
                    label="Concepto"
                    onChange={(e) => {
                      setSelected({ ...selected, concepto: e.target.value });
                    }}
                    value={selected.concepto}
                    className="mb-6"
                  ></TEInput>


                  <TEInput
                    type="date"
                    label="Fecha"
                    onChange={(e) => {
                      setSelected({ ...selected, fecha: e.target.value });
                    }}
                    value={selected.fecha}
                    className="mb-6"
                  ></TEInput>

                  <TEInput
                    type="number"
                    label="Monto Total"
                    onChange={(e) => {
                      setSelected({ ...selected, montoTotal: +e.target.value });
                    }}
                    value={selected.montoTotal}
                    className="mb-6"
                  ></TEInput>
                </div>
                {ShowCedulaError && (
                  <p className="text-red-500">La Cedula no es valida</p>
                )}
                <TERipple rippleColor="light" className="w-full mt-2">
                  <button
                    type="button"
                    disabled={
                      (selected.cedula === "" && selected.rnc === "") ||
                      selected.concepto === "" ||
                      selected.fecha === ""||
                      selected.montoTotal === 0
                    }
                    onClick={() => {
                      if ((selected.cedula === "" && selected.rnc === "") ||
                      selected.concepto === "" ||
                      selected.fecha === ""||
                      selected.montoTotal === 0) {
                        alert("Debe llenar todos los campos");
                      } else {
                        if (mode === "create") {
                          const data = {
                            ...selected,
                            fecha: selected.fecha + "T00:00:00.000Z",
                          };
                          useApi.postData(data, () => {
                            setSelected({
                              id: 0,
                              cedula: "",
                              rnc: "",
                              concepto: "",
                              fecha: "",
                              montoTotal: 0,
                            });
                            setShowModal(false);
                            useApi.callApi();
                          });
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
              Historial Crediticio
            </h1>
          </div>
        </header>
        <div className="m-2">
          <div className="flex justify-between items-center p-4">
          <button
            type="button"
            onClick={() => {
              setSelected({
                id: 0,
                cedula: "",
                rnc: "",
                concepto: "",
                fecha: "",
                montoTotal: 0,
              });
              setMode("create");
              setShowModal(true);
            }}
            className=" my-2 inline-block rounded bg-success
         px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal
          text-white shadow-[0_4px_9px_-4px_#14a44d]
           transition duration-150 ease-in-out
            hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]
             focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]
              focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          >
            Agregar
          </button>
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Buscar cedula o rnc..."
          className="w-full pl-4 pr-10 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>
    </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          id
                        </th>
                        <th scope="col" className="px-6 py-4">
                        Cedula o RNC
                        </th>
                        <th scope="col" className="px-6 py-4">
                        Concepto
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Monto Total
                        </th>
                        <th scope="col" className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        <tr
                          key={data.id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {data.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {data.cedula || data.rnc}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {data.concepto}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {data.fecha}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {data.montoTotal}
                          </td>
                        </tr>
                      }
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

export default CreditHistory;
