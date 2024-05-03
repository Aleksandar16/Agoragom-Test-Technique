import React, { useState, useEffect } from "react";
import axios from 'axios';
import { PencilIcon } from "@heroicons/react/24/solid";
import { Card, Typography, CardBody, CardFooter, Button, IconButton } from "@material-tailwind/react";
import { HiTrash } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import Modal from 'react-modal';
import EditTaskForm from "./EditTaskForm";

Modal.setAppElement('#root');

function TaskList() {
  const [data, setData] = useState([]);
  const TABLE_HEAD = ["Identifiant", "Titre", "Modifier", "Supprimer", ""];
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tasks');
        setData(response.data);
        window.location.reload;
      } catch (error) {
        console.error('Erreur API :', error);
      }
    };

    fetchData();
  }, []);

  const openModal = (task) => () => {
    setIsOpen(true);
    setSelectedTask(task);
  };  

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  const totalPages = Math.ceil(
    data.length / itemsPerPage
  );

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      if (response.status === 200) {
        setData(data.filter(task => task.id !== id));
        alert('Task N°' + id + ' supprimée');
        window.location.reload;
      }
    } catch (error) {
      console.error('Erreur API :', error);
    }
  };

  return (
    <>
      <EditTaskForm task={selectedTask} isOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className="block">
        <Card className="block h-full w-full">
          <CardBody className="overflow-scroll px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="w-36 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(
                      currentPage * itemsPerPage,
                      currentPage * itemsPerPage + itemsPerPage
                    ).map(
                  (e) => {
                    const isLast = data.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
 
                    return (
                      <tr key={e.id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {e.id}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {e.title}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <IconButton variant="text" onClick={openModal(e)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </td>
                        <td className={classes}>
                          <button onClick={() => deleteTask(e.id)}><HiTrash className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex justify-between border-t border-blue-gray-50 p-4 items-center">
            <select
              name="items-per-page"
              id="items-per-page"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="rounded border h-10 px-2"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
            </select>
            <ReactPaginate
              previousLabel={
                <Button variant="outlined" size="sm" className="h-10 px-2 rounded border">
                  <RiArrowLeftSLine />
                </Button>
              }
              nextLabel={
                <Button variant="outlined" size="sm" className="h-10 px-2 rounded border">
                  <RiArrowRightSLine />
                </Button>
              }
              breakLabel={'...'}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'flex space-x-2 items-center'}
              activeClassName={'text-black border-white'}
              previousClassName={'text-lg bg-gray-950 rounded-lg'}
              nextClassName={'text-lg bg-gray-950 rounded-lg'}
              pageLinkClassName={
                'px-4 pb-2 pt-2 rounded-lg border bg-gray-950 border-gray-950 hover:border-solid hover:border-indigo-500'
              }
              forcePage={currentPage}
            />
            <p>Page : {currentPage + 1} / {totalPages}</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default TaskList;
