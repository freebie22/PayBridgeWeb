const withAuth = (WrappedComponent: any) => {
    return(props: any) => {
        const accessToken = localStorage.getItem("token");
        if(!accessToken)
            {
                location.replace("/login");
                return null
            }
        return <WrappedComponent {...props}></WrappedComponent>
    }
}

export default withAuth;