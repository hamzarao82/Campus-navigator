package io.srounce.reactnativeindooratlas;

import android.app.Activity;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.indooratlas.android.sdk.IALocation;
import com.indooratlas.android.sdk.IALocationListener;
import com.indooratlas.android.sdk.IALocationManager;
import com.indooratlas.android.sdk.IALocationRequest;
import com.indooratlas.android.sdk.IARegion;

public class IndoorAtlasReactNativePlugin extends ReactContextBaseJavaModule implements IALocationListener {
  private static final String TAG = "IndoorAtlasPlugin";
  private final ReactApplicationContext reactContext;
  private final Activity activity;
  private IALocationManager locationManager;

  public IndoorAtlasReactNativePlugin(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    this.reactContext = reactContext;
    this.activity = activity;
    this.locationManager = IALocationManager.create(activity);
  }

  @Override
  public String getName() {
    return "IndoorAtlasReactNativePlugin";
  }

  @ReactMethod
  public void requestLocationUpdates(Promise promise) {
    try {
      IALocationRequest request = IALocationRequest.create();
      locationManager.requestLocationUpdates(request, this);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("LOCATION_ERROR", "Failed to request location updates: " + e.getMessage());
    }
  }

  @ReactMethod
  public void removeLocationUpdates(Promise promise) {
    try {
      locationManager.removeLocationUpdates(this);
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("LOCATION_ERROR", "Failed to remove location updates: " + e.getMessage());
    }
  }

  @Override
  public void onLocationChanged(IALocation location) {
    WritableMap params = Arguments.createMap();
    WritableMap locationMap = Arguments.createMap();
    
    locationMap.putDouble("latitude", location.getLatitude());
    locationMap.putDouble("longitude", location.getLongitude());
    locationMap.putDouble("accuracy", location.getAccuracy());
    locationMap.putInt("floorLevel", location.getFloorLevel());
    locationMap.putBoolean("hasFloorLevel", location.hasFloorLevel());

    params.putMap("location", locationMap);
    
    sendEvent("RNIA.onLocationChanged", params);
  }

  @Override
  public void onStatusChanged(String provider, int status, Bundle extras) {
    WritableMap params = Arguments.createMap();
    params.putString("provider", provider);
    params.putInt("status", status);
    
    sendEvent("RNIA.onStatusChanged", params);
  }

  @Override
  public void onEnterRegion(IARegion region) {
    WritableMap params = Arguments.createMap();
    WritableMap regionMap = Arguments.createMap();
    
    regionMap.putString("id", region.getId());
    regionMap.putString("name", region.getName());
    regionMap.putString("type", region.getType().toString());
    
    params.putMap("region", regionMap);
    
    sendEvent("RNIA.onEnterRegion", params);
  }

  @Override
  public void onExitRegion(IARegion region) {
    WritableMap params = Arguments.createMap();
    WritableMap regionMap = Arguments.createMap();
    
    regionMap.putString("id", region.getId());
    regionMap.putString("name", region.getName());
    regionMap.putString("type", region.getType().toString());
    
    params.putMap("region", regionMap);
    
    sendEvent("RNIA.onExitRegion", params);
  }

  private void sendEvent(String eventName, WritableMap params) {
    try {
      reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
    } catch (Exception e) {
      Log.e(TAG, "Error sending event: " + e.getMessage());
    }
  }

  @Override
  public void onCatalystInstanceDestroy() {
    super.onCatalystInstanceDestroy();
    if (locationManager != null) {
      locationManager.destroy();
    }
  }
}
