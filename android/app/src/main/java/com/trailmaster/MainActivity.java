package com.trailmaster;

import com.facebook.react.ReactActivity;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage; // <-- import

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Trailmaster";
    }
    /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ReactNativeMapboxGLPackage());  // <-- Register package here
    }
}
