import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { ObjectId } from "bson";
import 'react-toastify/dist/ReactToastify.css';

const FormManage = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", salary: "", date: "" });
  const [employeeData, setEmployeeData] = useState([]);
  const emailRef = useRef();

  const getEmployees = async () => {
    let req = await fetch("http://localhost:3000/employees");
    let employees = await req.json();
    setEmployeeData(employees);
  }

  useEffect(() => {
    getEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const saveEmployee = async () => {
    if (form.firstName && form.lastName && form.email && form.salary && form.date) {
      const newEmployee = { ...form, _id: new ObjectId().toString() };
      let response = await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee)
      });
      
      let savedEmployee = await response.json();
      setEmployeeData([...employeeData, savedEmployee]);
      setForm({ firstName: "", lastName: "", email: "", salary: "", date: "" });

      toast.success('Employee saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error('Error: All fields are required!');
    }
  };

  const deleteEmployee = async (id) => {
    let c = confirm("Do you really want to delete this employee?");
    if (c) {
      await fetch(`http://localhost:3000/employees/${id}`, {
        method: "DELETE"
      });
      setEmployeeData(employeeData.filter(employee => employee._id !== id));
      toast.success('Employee deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const editEmployee = (id) => {
    const employee = employeeData.find(emp => emp._id === id);
    setForm(employee);
    setEmployeeData(employeeData.filter(emp => emp._id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8">
      <ToastContainer />
      <div className="text-amber-500 font-extrabold text-3xl text-center py-3">
        <span>{"{"}</span>%<span className="text-blue-950">Work</span>Hive%<span>{"}"}</span>
      </div>

      <form className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg mb-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700" htmlFor="salary">Salary</label>
            <input
              id="salary"
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700" htmlFor="date">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="button"
            onClick={saveEmployee}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>

      <div className="text-lg font-semibold mb-4">Employee Data</div>
      <div className="max-w-full">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-950 text-white text-sm sm:text-base">
              <tr>
                <th className="py-2 px-2 sm:px-4">First Name</th>
                <th className="py-2 px-2 sm:px-4">Last Name</th>
                <th className="py-2 px-2 sm:px-4">Email</th>
                <th className="py-2 px-2 sm:px-4">Salary</th>
                <th className="py-2 px-2 sm:px-4">Date</th>
                <th className="py-2 px-2 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 text-xs sm:text-sm">
              {employeeData.map(employee => (
                <tr key={employee._id}>
                  <td className="py-2 px-2 sm:px-4">{employee.firstName}</td>
                  <td className="py-2 px-2 sm:px-4">{employee.lastName}</td>
                  <td className="py-2 px-2 sm:px-4">{employee.email}</td>
                  <td className="py-2 px-2 sm:px-4">{employee.salary}</td>
                  <td className="py-2 px-2 sm:px-4">{employee.date}</td>
                  <td className="py-2 px-2 sm:px-4 flex gap-1 sm:gap-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => { navigator.clipboard.writeText(employee.email); toast.info('Email copied to clipboard!'); }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        className="w-4 h-4 sm:w-6 sm:h-6"
                      ></lord-icon>
                    </button>
                    <button className="text-green-500 hover:text-green-700" onClick={() => editEmployee(employee._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        className="w-4 h-4 sm:w-6 sm:h-6"
                      ></lord-icon>
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => deleteEmployee(employee._id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        className="w-4 h-4 sm:w-6 sm:h-6"
                      ></lord-icon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden space-y-2">
          {employeeData.map(employee => (
            <div key={employee._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{employee.firstName} {employee.lastName}</div>
                <div className="flex items-center gap-1">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => { navigator.clipboard.writeText(employee.email); toast.info('Email copied to clipboard!'); }}>
                    <lord-icon
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      className="w-6 h-6"
                    ></lord-icon>
                  </button>
                  <button className="text-green-500 hover:text-green-700" onClick={() => editEmployee(employee._id)}>
                    <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      className="w-6 h-6"
                    ></lord-icon>
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => deleteEmployee(employee._id)}>
                    <lord-icon
                      src="https://cdn.lordicon.com/skkahier.json"
                      trigger="hover"
                      className="w-6 h-6"
                    ></lord-icon>
                  </button>
                </div>
              </div>
              <div className="text-gray-600 mt-2">{employee.email}</div>
              <div className="text-gray-600">{employee.salary}</div>
              <div className="text-gray-600">{employee.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormManage;
