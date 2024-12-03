import React, { useState } from "react";
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
  typeMovement: string;
  typeDocumentId: number;
  typeDocumentAccount: string;
  numberDocument: number;
  date: string;
  clientId: number;
  clientName: string;
  amount: number;
  status: number;
};
function Transaction() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<item>({
    id: 0,
    typeMovement: "",
    typeDocumentId: 0,
    typeDocumentAccount: "",
    numberDocument: 0,
    date: "",
    clientId: 0,
    clientName: "",
    amount: 0,
    status: 0,
  });
  const [mode, setMode] = useState("create");
  const useApi = useApiData("Transactions");
  const useClientApi = useApiData("Clients");
  const useTypeDocumentApi = useApiData("TipoDocuments");
  React.useEffect(() => {
    useApi.callApi();
    useClientApi.callApi();
    useTypeDocumentApi.callApi();
  }, []);

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
                    data={[{
                      value: 0,
                      text: 'seleccionar cliente',
                  },...(useClientApi.data?.map((client: any) => ({
                      value: client.id, 
                      text: client.name
                    })) || [])]}
                    label="Cliente"
                    value={selected.clientId}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, clientId: e.value, clientName: e.text });
                      }
                    }}
                  />

                  <TESelect
                    data={[{
                      value: 0,
                      text: 'seleccionar estado',
                  },...(useTypeDocumentApi.data?.map((typeDocument: any) => ({
                      value: typeDocument.id, 
                      text: typeDocument.cuenta
                    })) || [])]}
                    label="Tipo Documento"
                    value={selected.typeDocumentId}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, typeDocumentId: e.value, typeDocumentAccount: e.text });
                      }
                    }}
                  />

                  <TEInput
                    type="text"
                    label="Tipo Movimiento"
                    onChange={(e) => {
                      setSelected({ ...selected, typeMovement: e.target.value });
                    }}
                    value={selected.typeMovement}
                    className="mb-6"
                  ></TEInput>


                  <TEInput
                    type="number"
                    label="Numero Documento"
                    onChange={(e) => {
                      setSelected({ ...selected, numberDocument: +e.target.value });
                    }}
                    value={selected.numberDocument}
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
                    type="number"
                    label="Monto"
                    onChange={(e) => {
                      setSelected({ ...selected, amount: +e.target.value });
                    }}
                    value={selected.amount}
                    className="mb-6"
                  ></TEInput>
              
                  <TESelect
                    data={helpers.status}
                    label="Estado"
                    value={selected.status}
                    onValueChange={(e: any) => {
                      if (e) {
                        setSelected({ ...selected, status: e.value });
                      }
                    }}
                  />
                </div>
                <TERipple rippleColor="light" className="w-full mt-2">
                  <button
                    type="button"
                    disabled={
                      selected.status === 0 ||
                      selected.typeMovement === "" ||
                      selected.typeDocumentId === 0 ||
                      selected.numberDocument === 0 ||
                      selected.date === "" ||
                      selected.clientId === 0 ||
                      selected.amount === 0
                    }
                    onClick={() => {
                      if (selected.status === 0 ||
                        selected.typeMovement === "" ||
                        selected.typeDocumentId === 0 ||
                        selected.numberDocument === 0 ||
                        selected.date === "" ||
                        selected.clientId === 0 ||
                        selected.amount === 0) {
                        alert("Debe llenar todos los campos");
                      } else {
                        if (mode === "create") {
                          const data = {
                            ...selected,
                          };
                          useApi.postData(data, () => {
                            setSelected({
                              id: 0,
                              typeMovement: "",
                              typeDocumentId: 0,
                              typeDocumentAccount: "",
                              numberDocument: 0,
                              date: "",
                              clientId: 0,
                              clientName: "",
                              amount: 0,
                              status: 0,
                            });
                            setShowModal(false);
                            useApi.callApi();
                          });
                        } else {
                          if (mode === "edit") {
                            const data = {
                              ...selected,
                            };
                            useApi.putData(selected.id, data, () => {
                              setSelected({
                                id: 0,
                                typeMovement: "",
                                typeDocumentId: 0,
                                typeDocumentAccount: "",
                                numberDocument: 0,
                                date: "",
                                clientId: 0,
                                clientName: "",
                                amount: 0,
                                status: 0,
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
                id: 0,
                typeMovement: "",
                typeDocumentId: 0,
                typeDocumentAccount: "",
                numberDocument: 0,
                date: "",
                clientId: 0,
                clientName: "",
                amount: 0,
                status: 0,
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
                        Cliente
                        </th>
                        <th scope="col" className="px-6 py-4">
                        Tipo Movimiento
                        </th>
                        <th scope="col" className="px-6 py-4">
                        Numero Documento
                        </th>
                        <th scope="col" className="px-6 py-4">
                        Monto
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(useApi.data || []).map((row: any) => (
                        <tr
                          key={row.id}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {row.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.clientName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.typeMovement}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.numberDocument}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.amount}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {helpers.getStatus(+row.status)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button
                              type="button"
                              onClick={() => {
                                setSelected({
                                  ...row,
                                  status: +row.status,
                                });
                                setMode("edit");
                                setShowModal(true);
                              }}
                              className="inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                useApi.deleteData(row.id, () => {
                                  setSelected({
                                    id: 0,
                                    typeMovement: "",
                                    typeDocumentId: 0,
                                    typeDocumentAccount: "",
                                    numberDocument: 0,
                                    date: "",
                                    clientId: 0,
                                    clientName: "",
                                    amount: 0,
                                    status: 0,
                                  });
                                  useApi.callApi();
                                });
                              }}
                              className="inline-block rounded-full bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                            >
                              Eliminar
                            </button>
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

export default Transaction;
