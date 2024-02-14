import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas' 


const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

function Formulario({setMonedas}) {

    const [ criptos, setCriptos ] = useState([])
    const [ error, setError ] = useState(false)
    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ cripto, SelectCripto ] = useSelectMonedas('Elige tu Cripto', criptos)
    
    useEffect(() => {
      const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        const arrayCriptos = resultado.Data.map( cripto => {

          const objetoCripto = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName
          }

          return objetoCripto
        })

        setCriptos(arrayCriptos)
      }

      

      consultarAPI();
    }, [])


    const handleSubmit = e => {
      e.preventDefault()

      if([moneda, cripto].includes('')) {
        setError(true)
        return
      }
      
      setError(false)
      setMonedas({
        moneda,
        cripto
      })
    }

  return (

    <>
      {error && <Error>Todos los componentes son obligatorios</Error>}
    <form
      onSubmit={handleSubmit}
    >
        <SelectMonedas />
        
        

        <SelectCripto />

       

        <InputSubmit 
        type="submit" 
        value='Cotizar'
        />
    </form>
    </>
  )
}

export default Formulario