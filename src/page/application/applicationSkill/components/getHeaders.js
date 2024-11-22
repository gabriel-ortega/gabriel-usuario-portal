const headers = [
    {
      cook: {
        10: "PRACTICAL KITCHEN KNOWLEDGE",
        14: "FOOD HYGIENE AND PERSONAL",
        22: "STORAGE OF FOOD",
        25: "MANAGEMENT OF RESERVATIONS",
        32: "ENVIRONMENTAL PROTECTION"
      },
      abos: {
        7: "I have procedures of the supported and carried out in all deck-planned maintenance including",
        13: "Always followed all working routines and procedures associated with entering and working in confined spaces, and donning hard helmets, safety belts and other PPE.",
        20: "Exceptional quality of work with outstanding results"
      },
      bosun: {
        7: "Do you have full knowledge of all day-to-day deck operations related to maintenance and deck procedures including?",
        14: "Do you always followed all working routines and procedures associated with safety & environmental procedures?",
        16: "Do you have Knowledge of the responsibility that the crew in charge properly use the appropriate protective equipment?",
        19:"Exceptional quality of work with outstanding results"
      },
      fitter: {
        8: "Do you always followed all working routines and procedures associated with safety & environmental procedures?",
        11: "I have procedures of the supported and carried out in all engine-planned maintenance including:",
        19:"Exceptional quality of work with outstanding results:"
      },
      oiler: {
        5: "FOR: WIPER",
        10: "I HAVE PROCEDURES OF THE SUPPORTED AND CARRIED OUT IN ALL ENGINE-PLANNED MAINTENANCE INCLUDING:",
        23:"EXCEPTIONAL QUALITY OF WORK WITH OUTSTANDING RESULTS:"
      }
    }
  ];

export const getPosition = (position) =>{
    if (position=="2"){
        return "abos"
      }else if(position=="3"){
         return "cook"
      }else if(position=="4"){
         return "bosun"
      }else if(position=="5"){
        return "oiler"
      }else if(position=="6"){
        return "messman"
      }else if(position=="7"){
        return "fitter"
      }else{
        return ""
      }
}


export const getHeader = (position,id) => {
    if (position=="cook"){
      return headers[0].cook[id]
    }else if(position=="abos"){
      return headers[0].abos[id]
    }else if(position=="bosun"){
      return headers[0].bosun[id]
    }else if(position=="fitter"){
      return headers[0].fitter[id]
    }else if(position=="oiler"){
      return headers[0].oiler[id]
    }else{
      return ""
    }
    };
