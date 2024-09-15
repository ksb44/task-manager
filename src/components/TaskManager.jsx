import React, { useState } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editIndex, setEditIndex] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: false,
  });

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? newTask : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      status: false,
    });
  };

  const handleToggle = (task) => {
    const updated = tasks.map((tsk) =>
      tsk === task ? { ...task, status: !tsk.status } : tsk
    );
    setTasks(updated);
  };

  const filtered = tasks.filter((task) => {
    if (filter === "Completed") return task.status;
    if (filter === "Pending") return !task.status;
    if (priorityFilter === "low") return task.priority === "low";
    if (priorityFilter === "medium") return task.priority === "medium";
    if (priorityFilter === "high") return task.priority === "high";
    return true;
  });

  const searchFiltered = tasks.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (task) => {
    const updated = tasks.filter((tsk) => tsk !== task);
    setTasks(updated);
  };

  const handleEdit = (task, index) => {
    setEditIndex(index);
    setNewTask(task);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setIsSearch(true);
  };

  const isOverdue = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < currentDate;
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const itemsPerPage = 2;
  const totalPage = Math.ceil((isSearch ? searchFiltered.length : filtered.length) / itemsPerPage);

  const lastIndex = itemsPerPage * currentPage;
  const firstIndex = lastIndex - itemsPerPage;
  const paginatedTasks = (isSearch ? searchFiltered : filtered).slice(
    firstIndex,
    lastIndex
  );

  return (
    <>
    <h3 className="text-center mt-2 font-bold text-2xl text-red-400">Task Manipulation</h3>
      <div className="max-w-3xl mx-auto mt-10">
        <div className="flex justify-center">
          <input
            type="search"
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Search tasks..."
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={newTask.title}
              onChange={handleChange}
              name="title"
              type="text"
              placeholder="Enter title"
            />
            <input
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={newTask.description}
              onChange={handleChange}
              name="description"
              type="text"
              placeholder="Enter description"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleChange}
            />
            <select
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
            >
              <option value="">Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              {editIndex !== null ? "Edit Task" : "Add Task"}
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-1 mr-2 ${filter === "All" ? 'bg-indigo-600 text-white' : 'border border-gray-300'} rounded-full`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Completed")}
              className={`px-4 py-1 mr-2 ${filter === "Completed" ? 'bg-indigo-600 text-white' : 'border border-gray-300'} rounded-full`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("Pending")}
              className={`px-4 py-1 mr-2 ${filter === "Pending" ? 'bg-indigo-600 text-white' : 'border border-gray-300'} rounded-full`}
            >
              Pending
            </button>
          </div>
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="All">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {paginatedTasks.map((task, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex items-center ">
                <input 
                  type="checkbox"
                  checked={task.status}
                  onChange={() => handleToggle(task)}
                  className="ml-3"
                />
                <div className="w-full p-2 m-2">
                  <p className="text-lg font-semibold">
                    {task.title}
                    {isOverdue(task.dueDate) && (
                      <span className="text-red-600 ml-2">(Overdue)</span>
                    )}
                  </p>
                  <p>{task.description}</p>
                  <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                  <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
                </div>
              </div>
              <div className="flex justify-center bg-white space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(task, index)}
                  className="px-4 py-1 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task)}
                  className="px-4 py-1 text-white bg-red-500 rounded-full hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {paginatedTasks.length === 0 && <p className="text-center text-gray-600">No tasks found</p>}

          <div className="flex justify-between items-center mt-6">
            <button
              disabled={currentPage === 1}
              onClick={handlePrevious}
              className="px-4 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            >
              Prev
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPage}
            </span>
            <button
              disabled={currentPage === totalPage}
              onClick={handleNext}
              className="px-4 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskManager;
