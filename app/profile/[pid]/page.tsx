
function Page({ params }: { params: { pid: string } }) {
    return <div>Profile Page of {params.pid} </div>
}

export default Page