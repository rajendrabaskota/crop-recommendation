// import React from 'react'
// import "./results.css";

// export const Results = () => {
//   let result = [
//     {
//       node : '1',N :'100',P : '200',
//       K : '300',pH : '4',temp :' 20',
//       hum : '60',predictions : ['rice','maize'],
//     },
//     {
//       node : '2',N : '100',P : '200',
//       K : '300',pH : '4',temp : '20',
//       hum : '60'
//     },
//     {
//       node : '3',N : '100',P : '200',
//       K : '300',pH : '4',temp : '20',
//       hum : '60'
//     },
//   ];
//   return (
//     <div className='table_div'>
//       <table className='table'>
//         <tr>
//           <th className='table_th'>Node</th>
//           <th className='table_th'>N</th>
//           <th className='table_th'>P</th>
//           <th className='table_th'>K</th>
//           <th className='table_th'>pH</th>
//           <th className='table_th'>Temperature</th>
//           <th className='table_th'>Humidity</th>
//           <th className='table_th'>Predictions</th>
//         </tr>
//         <tr>
//           {result.map((r) => {
//             return <tr>
//               <td className='table_td'>{r.node}</td>
//               <td className='table_td'>{r.N}</td>
//               <td className='table_td'>{r.P}</td>
//               <td className='table_td'>{r.K}</td>
//               <td className='table_td'>{r.pH}</td>
//               <td className='table_td'>{r.temp}</td>
//               <td className='table_td'>{r.hum}</td>
//               <td className='table_td'>{r.predictions}</td>
//             </tr>
//           })}
//         </tr>
//       </table>
//     </div>
//   )
// }


import React from 'react'
import './results.css'

export const Results = () => {
  let result = [
    {
      node: '1',
      N: '100',
      P: '200',
      K: '300',
      pH: '4',
      temp: '20',
      hum: '60',
      predictions: ['rice', 'maize'],
    },
    {
      node: '2',
      N: '100',
      P: '200',
      K: '300',
      pH: '4',
      temp: '20',
      hum: '60',
      predictions: [],
    },
    {
      node: '3',
      N: '100',
      P: '200',
      K: '300',
      pH: '4',
      temp: '20',
      hum: '60',
      predictions: ['wheat'],
    },
  ];

  return (
    <div className='table_div'>
      <h1 className='first_page_heading'>Predictions</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Node</th>
            <th>N</th>
            <th>P</th>
            <th>K</th>
            <th>pH</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Predictions</th>
          </tr>
        </thead>
        <tbody>
          {result.map((r) => {
            return (
              <tr key={r.node}>
                <td>{r.node}</td>
                <td>{r.N}</td>
                <td>{r.P}</td>
                <td>{r.K}</td>
                <td>{r.pH}</td>
                <td>{r.temp}</td>
                <td>{r.hum}</td>
                <td>
                  {r.predictions.map((prediction, index) => (
                    <div style={{ color: 'rgb(0,80,0)', padding: '0.5rem',}} key={index}>{prediction}</div>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
