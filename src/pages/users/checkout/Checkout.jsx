/** @format */

import React, { useEffect } from "react";
const Checkout = () => {
  return (
    <div className="font-Arvo-Regular">
      <div>
        <h1 className="text-lg">Keranjang Belanjaan</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900"></th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Barang
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Harga
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Jumlah
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left text-gray-900">
                  Sub Total
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                  John Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Developer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $120,000
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                  Jane Doe
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  04/11/1980
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Web Designer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $100,000
                </td>
              </tr>

              <tr>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                  Gary Barlow
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  24/05/1995
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  Singer
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  $20,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
