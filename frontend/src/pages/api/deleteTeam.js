
import {Methods} from '../../utils/methods';

export default function handler(req, res) {
    if (req.method === "POST"){
        let teamObjectsTemp = []
    for (let i = 0; i < teamObjects.length; i++) {
        if (teamObjects[i].id != req.body.teamId)
            teamObjectsTemp.push(teamObjects[i])
    }
    teamObjects = teamObjectsTemp;
    res.redirect("http://localhost:3000/teams/teams");
    }
  }