import { useFooter } from '@hooks/Footer'

const Footer = () => {
  const { blocks } = useFooter()

  return (
    <footer>
      <p>Footer</p>
      {JSON.stringify(blocks)}
    </footer>
  )
}

export default Footer
