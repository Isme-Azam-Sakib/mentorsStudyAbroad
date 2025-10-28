export interface Branch {
  id: string;
  name: string;
  location: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleMapsUrl?: string;
  contact: {
    education: string[];
    studyAbroad: string[] | null;
    email: string;
  };
  type: 'main' | 'campus' | 'branch';
}

export const branchesData: Branch[] = [
  // Dhaka Branches
  {
    id: 'kalabagan',
    name: 'Kalabagan Branch',
    location: 'Kalabagan, Dhaka',
    address: '166/1 Mirpur Road (Beside Dolphin Goli), Kalabagan, Dhaka-1205',
    coordinates: {
      lat: 23.7464,
      lng: 90.3764
    },
    googleMapsUrl: 'https://maps.app.goo.gl/LMiGETkcsEd3odGWA',
    contact: {
      education: ['09610883388'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'wari',
    name: 'Wari',
    location: 'Wari, Dhaka',
    address: '7 Folder Street (Wari Abed High School Building) Wari, Dhaka',
    coordinates: {
      lat: 23.7231,
      lng: 90.4086
    },
    googleMapsUrl: 'https://maps.app.goo.gl/PfiM72z9mTbNDGpQ9',
    contact: {
      education: ['09610883388'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'uttara-campus-1',
    name: 'Uttara Campus - 1',
    location: 'Uttara, Dhaka',
    address: 'Level 4, Millenium Tower, House-02, Road-07, Sector-03, Uttara, Dhaka',
    coordinates: {
      lat: 23.8695,
      lng: 90.3887
    },
    googleMapsUrl: 'https://maps.app.goo.gl/GuQdwvXwYALkjJDy5',
    contact: {
      education: ['09610883388'],
      studyAbroad: ['01713243438', '0171384398'],
      email: 'info@mentors.com.bd'
    },
    type: 'campus'
  },
  {
    id: 'uttara-campus-2',
    name: 'Uttara Campus - 2',
    location: 'Uttara, Dhaka',
    address: 'Level-7, Plot 17, Sonargaon Janopath, Sector-13, Uttara',
    coordinates: {
      lat: 23.8695,
      lng: 90.3887
    },
    googleMapsUrl: 'https://maps.app.goo.gl/v1WbSQvnJ1swGTRz9',
    contact: {
      education: ['09610883388'],
      studyAbroad: ['48959796', '01713243420'],
      email: 'info@mentors.com.bd'
    },
    type: 'campus'
  },
  {
    id: 'banani',
    name: 'Banani Branch',
    location: 'Banani, Dhaka',
    address: 'Taneem Square (1st Fl), 158/E Kamal Ataturk Avenue, Banani, Dhaka-1213',
    coordinates: {
      lat: 23.7949,
      lng: 90.4034
    },
    googleMapsUrl: 'https://maps.app.goo.gl/53NqpFzL4FmYGsi29',
    contact: {
      education: ['09610883388'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'mouchak',
    name: 'Mouchak Branch',
    location: 'Mouchak, Dhaka',
    address: '128/2 New Circular Road (West Side of Mouchak Market), Mouchak, Dhaka-1219',
    coordinates: {
      lat: 23.7334,
      lng: 90.4170
    },
    googleMapsUrl: 'https://maps.app.goo.gl/LFLPrzwsKDQDB7n97',
    contact: {
      education: ['09610883388'],
      studyAbroad: ['01713243415'],
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'mirpur',
    name: 'Mirpur Branch',
    location: 'Mirpur, Dhaka',
    address: 'House 14, Main Road Section 7 (Beside Mirpur 11 Central Mosque), Pallabi, Mirpur, Dhaka',
    coordinates: {
      lat: 23.8041,
      lng: 90.3617
    },
    googleMapsUrl: 'https://maps.app.goo.gl/3rRBYdijzoTGq7Yp9',
    contact: {
      education: ['09610883388'],
      studyAbroad: ['01713243437', '01701215957'],
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  
  // Other Branches
  {
    id: 'nawabganj',
    name: 'Nawabganj',
    location: 'Nawabganj, Dhaka',
    address: 'Khandokar Tower opposite Nawabganj Etim Khana, Nawabganj 1320, Dhaka',
    coordinates: {
      lat: 23.8103,
      lng: 90.4125
    },
    googleMapsUrl: 'https://maps.app.goo.gl/wLs1QqHJds8gbusE9',
    contact: {
      education: ['01329640894'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  }, 
  {
    id: 'brahmanbaria',
    name: 'Brahmanbaria',
    location: 'Brahmanbaria',
    address: 'City Center 4th Floor, Court Road, Brahmanbaria',
    coordinates: {
      lat: 23.9667,
      lng: 91.1111
    },
    googleMapsUrl: 'https://maps.app.goo.gl/8DtPwiAhWuzEDtTS9',
    contact: {
      education: ['01321207484'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'chattogram',
    name: 'Chattogram',
    location: 'Chattogram',
    address: 'Mannan Bhaban, 156 Nur Ahmed Road, Jubilee Road, Chattogram, Postal Code: 4000',
    coordinates: {
      lat: 22.341927364752543,
      lng:  91.82761763967876
    },
    googleMapsUrl: 'https://maps.app.goo.gl/SEE59Zj8id8zX4vq7',
    contact: {
      education: ['01713243432'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'sylhet',
    name: 'Sylhet Branch',
    location: 'Sylhet',
    googleMapsUrl: 'https://maps.app.goo.gl/fN2Ljv66Z8TkfGwG7',
    address: '8th Floor, Kaniz Plaza, Zindabazar, Sylhet',
    coordinates: {
      lat: 24.9045,
      lng: 91.8611
    },
    contact: {
      education: ['01713243426'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'rangpur-campus-2',
    name: 'Rangpur Campus - 2',
    location: 'Rangpur',
    address: 'Zara Tower, House#1601, Khamar Mor (Opposite Nesco Office), College Road, Rangpur',
    coordinates: {
      lat: 25.7439,
      lng: 89.2752
    },
    googleMapsUrl: 'https://maps.app.goo.gl/vx4ATdF9PE9CYnNd9',
    contact: {
      education: ['01713384393'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'campus'
  },
  {
    id: 'faridpur',
    name: 'Faridpur',
    location: 'Faridpur',
    address: 'Ashik View 3rd Floor, In front of Rainbow School, Jhiltuli, Faridpur',
    coordinates: {
      lat: 23.6010,
      lng: 89.8320
    },
    contact: {
      education: ['01329640895'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'khulna',
    name: 'Khulna',
    location: 'Khulna',
    address: 'Milton Tower, 64 KDA Avenue, 2nd Floor (Tetul Tola Mor), Khulna',
    coordinates: {
      lat: 22.8088,
      lng: 89.5539
    },
    googleMapsUrl: 'https://maps.app.goo.gl/TJNvsJKxGc2weYGX8',
    contact: {
      education: ['01329640872'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'rangpur-campus-1',
    name: 'Rangpur Campus - 1',
    location: 'Rangpur',
    address: 'Joy Tower, House# 02, Road# 01, Dhap Engineer Para Near RDRS Mor, Rangpur',
    coordinates: {
      lat: 25.7439,
      lng: 89.2752
    },
    googleMapsUrl: 'https://maps.app.goo.gl/dWRqjpCouqcCpJQb7',
    contact: {
      education: ['01713384393'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'campus'
  },
  {
    id: 'moulvibazar',
    name: 'Moulvibazar',
    location: 'Moulvibazar',
    address: 'Court Road, Aptech Computer Education, Moulvibazar',
    coordinates: {
      lat: 24.4820,
      lng: 91.7774
    },
    googleMapsUrl: 'https://maps.app.goo.gl/fXPpuHoX4r9EvXXt6',
    contact: {
      education: ['01713384392'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    location: 'Rajshahi',
    address: 'Giyas Plaza (2nd Floor), Shaheb Bazar, Zero Point, Rajshahi',
    coordinates: {
      lat: 24.3745,
      lng: 88.6042
    },
    googleMapsUrl: 'https://maps.app.goo.gl/wqiiRohrW1BAk67o6',
    contact: {
      education: ['01713384394'],
      studyAbroad: null,
      email: 'info@mentors.com.bd'
    },
    type: 'branch'
  }
];

// Helper functions
export const getBranchesByType = (type: Branch['type']): Branch[] => {
  return branchesData.filter(branch => branch.type === type);
};

export const getBranchesByLocation = (location: string): Branch[] => {
  return branchesData.filter(branch => 
    branch.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getStudyAbroadBranches = (): Branch[] => {
  return branchesData.filter(branch => branch.contact.studyAbroad && branch.contact.studyAbroad.length > 0);
};

export const getBranchById = (id: string): Branch | undefined => {
  return branchesData.find(branch => branch.id === id);
};

// Get all unique locations
export const getAllLocations = (): string[] => {
  const locations = branchesData.map(branch => branch.location);
  return [...new Set(locations)];
};

// Get all branches in Dhaka
export const getDhakaBranches = (): Branch[] => {
  return branchesData.filter(branch => branch.location.includes('Dhaka'));
};

// Get all branches outside Dhaka
export const getOutsideDhakaBranches = (): Branch[] => {
  return branchesData.filter(branch => !branch.location.includes('Dhaka'));
};
