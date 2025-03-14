import { POI, Route, Location } from '../types/navigation';
import { IndoorAtlasModule } from '../modules/IndoorAtlasModule';
import { firestore } from '../config/firebase';

class NavigationService {
  private static instance: NavigationService;

  private constructor() {}

  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }

  async getAllPOIs(): Promise<POI[]> {
    const snapshot = await firestore.collection('pois').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as POI));
  }

  async getNearbyPOIs(floor: number): Promise<POI[]> {
    const snapshot = await firestore
      .collection('pois')
      .where('floor', '==', floor)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as POI));
  }

  async addPOI(poi: Omit<POI, 'id'>): Promise<string> {
    const docRef = await firestore.collection('pois').add(poi);
    return docRef.id;
  }

  async updatePOI(id: string, poi: Partial<POI>): Promise<void> {
    await firestore.collection('pois').doc(id).update(poi);
  }

  async deletePOI(id: string): Promise<void> {
    await firestore.collection('pois').doc(id).delete();
  }

  async calculateRoute(start: Location, end: POI): Promise<Route> {
    return IndoorAtlasModule.calculateRoute(start, end);
  }

  async startNavigation(destination: POI): Promise<void> {
    return IndoorAtlasModule.startNavigation(destination);
  }

  async stopNavigation(): Promise<void> {
    return IndoorAtlasModule.stopNavigation();
  }
}

export default NavigationService.getInstance();
