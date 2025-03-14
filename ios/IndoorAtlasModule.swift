import Foundation
import IndoorAtlas

@objc(IndoorAtlasModule)
class IndoorAtlasModule: RCTEventEmitter {
  private var locationManager: IALocationManager?
  private var isPositioning = false
  
  override init() {
    super.init()
    locationManager = IALocationManager.sharedInstance()
    locationManager?.delegate = self
  }
  
  override func supportedEvents() -> [String] {
    return ["indoorLocationChanged", "floorPlanChanged"]
  }
  
  @objc func startPositioning() {
    guard !isPositioning else { return }
    locationManager?.startUpdatingLocation()
    isPositioning = true
  }
  
  @objc func stopPositioning() {
    guard isPositioning else { return }
    locationManager?.stopUpdatingLocation()
    isPositioning = false
  }
  
  @objc func getCurrentLocation(_ resolve: @escaping RCTPromiseResolveBlock, 
                               rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let location = locationManager?.location else {
      reject("ERROR", "Location not available", nil)
      return
    }
    
    resolve([
      "latitude": location.coordinate.latitude,
      "longitude": location.coordinate.longitude,
      "floor": location.floor?.level ?? 0
    ])
  }
}

extension IndoorAtlasModule: IALocationManagerDelegate {
  func indoorLocationManager(_ manager: IALocationManager, 
                           didUpdateLocations locations: [IALocation]) {
    guard let location = locations.last else { return }
    
    sendEvent(withName: "indoorLocationChanged", body: [
      "latitude": location.coordinate.latitude,
      "longitude": location.coordinate.longitude,
      "floor": location.floor?.level ?? 0
    ])
  }
  
  func indoorLocationManager(_ manager: IALocationManager, 
                           didEnter region: IARegion) {
    if region.type == .floorPlan {
      sendEvent(withName: "floorPlanChanged", body: [
        "floorPlanId": region.identifier
      ])
    }
  }
}
