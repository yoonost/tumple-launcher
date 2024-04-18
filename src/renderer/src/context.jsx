import { Component, createContext, useContext } from 'react'

export const DataContext = createContext()

export class ContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            window: 'launch',
            content: []
        }
        this.updateContent = this.updateContent.bind(this)
        this.updateWindow = this.updateWindow.bind(this)
    }

    componentDidMount () {
        window.electron.ipcRenderer.on('update-content', (_, content) => {
            this.setState({ content: content })
        })
        window.electron.ipcRenderer.on('change-window', (_, window) => {
            this.setState({ window: window })
        })
    }

    updateContent (modalName, modalState) {
        
    }
    
    updateWindow (window) {
        this.setState({ window: window })
    }

    render () {
        const data = this.state
        const { updateContent, updateWindow } = this

        return (
            <>
                <DataContext.Provider value={{ data, updateContent, updateWindow }}>
                    {this.props.children}
                </DataContext.Provider>
            </>
        )
    }
}

export const useDataContext = () => {
    return useContext(DataContext)
}