import React from 'react'

function MyAccount() {
    return (
        <div className="p-3 flex flex-col">
  {/* Header */}
  <div className="p-4 border-b">
    <h2 className="text-lg font-semibold">Account Overview</h2>
    <p className="text-sm text-gray-500">
      Manage private information for user safety
    </p>
  </div>

  {/* Main Content */}
  <div className="flex flex-col gap-4 mt-4">
    {/* Email */}
    <div className="flex flex-row items-center gap-3">
      <div className="w-1/3 text-right font-medium">E-mail</div>
      <input
        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="example@email.com"
        disabled
      />
    </div>

    {/* Username with Edit Button */}
    <div className="flex flex-row items-center gap-3">
      <div className="w-1/3 text-right font-medium">Username</div>
      <div className="flex flex-row items-center w-full gap-2">
        <input
          className="border rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          disabled
        />
        <button className="px-3 py-1 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition-all">
          Edit
        </button>
      </div>
    </div>

    {/* Change Password */}
    <div className="flex flex-row items-center gap-3">
      <div className="w-1/3 text-right font-medium">Password</div>
      <div className="w-full">
        <button className="text-blue-600 text-sm hover:underline">
          Change Password
        </button>
      </div>
    </div>
  </div>
</div>


    )
}

export default MyAccount