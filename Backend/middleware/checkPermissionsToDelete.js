import { routine } from "../servicesPrisma/routineService";
import { userProgress } from "../servicesPrisma/userProgressService";
import { user } from "../servicesPrisma/userService";
import { weeklyCalendar } from "../servicesPrisma/weeklyCalendarService";


const checkPermissionsToDelete = async (req, res, next) => {
  const userVerified = req.user; 
  const idResource = req.params.id; 
  const resourcePath = req.baseUrl.split('/')[2];

  try {
    let resource;

    switch (resourcePath) {
      case 'routine':
        resource = await routine.getOneRoutine(idResource);
        break;
      case 'userProgress':
        resource = await userProgress.getOneUserProgress(userVerified.id);
        break;
      case 'user': 
        resource = await user.getOneUser(userVerified.email);
        break;
      case 'weeklyCalendar':
        resource = await weeklyCalendar.getOneWeeklyCalendar(idResource);
        break;
      default:
        return res.status(400).json({ message: 'Tipo de recurso no válido' });
    }

    if (!resource) {
      return res.status(404).json({ message: 'Recurso no encontrado' });
    }

    if (resourcePath === 'user') {
        resource.user_id = resource.id;
    }

    if (resource.user_id !== userVerified.id) {
      return res.status(403).json({ message: 'No tienes permisos para eliminar este recurso' });
    }

    next();
  } catch (error) {
    console.error('Error al verificar permisos de eliminación:', error);
    return res.status(500).json({ message: 'Error al verificar permisos de eliminación' });
  }
};

export default checkPermissionsToDelete;