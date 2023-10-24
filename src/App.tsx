import { MainLayout } from '@components/main'
import { CssBaseline, ThemeProvider } from '@mui/material'
import store from '@store/store'
import { theme } from 'mui-theme/theme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './App.css'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
