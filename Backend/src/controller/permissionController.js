const Permission = require('../model/permissionModel');


// const permissions=Permission.find()
// console.log(permissions)

var getPermissions=async (req,res)=>{
    const adminPermission = new Permission({
        role: 'admin',
        permissions: ['ajouter', 'supprimer', 'modifier', 'consulter(formation)', 'ajouter,supprimer,modifier(candidat)', 'ajouter,supprimer,modifier(formateur)', 'gestion des questions et des réponses']
      });
      
      const formateurPermission = new Permission({
        role: 'formateur',
        permissions: ['upload des fichiers', 'ajouter,supprimer,modifier(quiz)', 'evaluer le candidat', 'des statiqtiques sur les formations qu\'il assure', 'gestion des questions et des réponses']
      });
    
      const candidatPermission = new Permission({
        role: 'candidat',
        permissions: ['gestion des questions', 'gestion des réponses', 'consulter la formation', 'obtention d\'une attestation', 'evaluation du formation et du formateur']
      });
    
    try {
        
       
        const permissions = await Permission.find(); 
        if(permissions.length===0){
            adminPermission.save()
            formateurPermission.save()
            candidatPermission.save()
        }
        else  {
            console.log("permission existe déja")
        }
        // console.log('permissions:', permissions);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
        
      }
}
module.exports ={getPermissions};