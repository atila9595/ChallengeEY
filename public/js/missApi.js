var url = 'http://127.0.0.1:8081/user/json_miss'
var missoeslist = async() => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }

}
console.log(missoeslist)