import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Posts from "../../components/profile/Posts"
import SideHead from "../../components/profile/SideHead"
import { getUserProfileByUserName } from "../../redux/actions/profileAction"

const UserPosts = () => {
  const { username } = useParams()
  const { auth, profile } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if (username === auth.user.username) {
      console.log("PERFIL PROPIO")
      setUserData([auth.user])
    } else {
      console.log(" -------- PERFIL AJENO -------")

      dispatch(getUserProfileByUserName({ users: profile.users, username, auth }))

      const data = profile.users.filter(user => user.username === username)
      let set = new Set(data.map(JSON.stringify))
      let newUserData = Array.from(set).map(JSON.parse)
      setUserData(newUserData)
    }
  }, [username, auth, profile.users, dispatch, setUserData])

  return (
    <SideHead
      username={username}
      children={<Posts username={username} userData={userData}/>}
      active="posts"
    />
  )
}

export default UserPosts
