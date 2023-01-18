import { Navbar } from "./Navbar"

export const Layout = ({children, isLogged}) => {
  return (
    <>
      <Navbar isLogged={isLogged}></Navbar>
      {children}
    </>
  )
}