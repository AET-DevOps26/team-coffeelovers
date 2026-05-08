<mxGraphModel dx="1046" dy="803" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="User" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="User" vertex="1">
      <mxGeometry height="154" width="190" x="70" y="55" as="geometry" />
    </mxCell>
    <mxCell id="User-a1" parent="User" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="name" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="User-a2" parent="User" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="email" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="User-a3" parent="User" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="password" vertex="1">
      <mxGeometry height="24" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="User-div" parent="User" style="line;strokeColor=#000000;fillColor=none;html=1;fontSize=11;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="98" as="geometry" />
    </mxCell>
    <mxCell id="User-m1" parent="User" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ register()" vertex="1">
      <mxGeometry height="24" width="190" y="106" as="geometry" />
    </mxCell>
    <mxCell id="User-m2" parent="User" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ login()" vertex="1">
      <mxGeometry height="24" width="190" y="130" as="geometry" />
    </mxCell>
    <mxCell id="TripRequest" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="TripRequest" vertex="1">
      <mxGeometry height="106" width="190" x="376" y="79" as="geometry" />
    </mxCell>
    <mxCell id="TripRequest-a1" parent="TripRequest" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="destination" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="TripRequest-a2" parent="TripRequest" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="numberOfDays" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="TripRequest-div" parent="TripRequest" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="TripRequest-m1" parent="TripRequest" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ create()" vertex="1">
      <mxGeometry height="24" width="190" y="82" as="geometry" />
    </mxCell>
    <mxCell id="TravelPreference" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="TravelPreference" vertex="1">
      <mxGeometry height="50" width="190" x="376" y="280" as="geometry" />
    </mxCell>
    <mxCell id="TravelPreference-a1" parent="TravelPreference" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="type" vertex="1">
      <mxGeometry height="24" width="190" y="27" as="geometry" />
    </mxCell>
    <mxCell id="GenAIService" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="GenAIService" vertex="1">
      <mxGeometry height="106" width="190" x="678" y="79" as="geometry" />
    </mxCell>
    <mxCell id="GenAIService-a1" parent="GenAIService" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="modelName" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="GenAIService-div" parent="GenAIService" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="GenAIService-m1" parent="GenAIService" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ generate()" vertex="1">
      <mxGeometry height="24" width="190" y="58" as="geometry" />
    </mxCell>
    <mxCell id="GenAIService-m2" parent="GenAIService" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ suggest()" vertex="1">
      <mxGeometry height="24" width="190" y="82" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="TravelPlan" vertex="1">
      <mxGeometry height="226" width="190" x="990" y="33" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-a1" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="destination" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-a2" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="status" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-a3" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="isFavorite" vertex="1">
      <mxGeometry height="24" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-a4" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="shareLink" vertex="1">
      <mxGeometry height="24" width="190" y="98" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-div" parent="TravelPlan" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="122" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-m1" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ save()" vertex="1">
      <mxGeometry height="24" width="190" y="130" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-m2" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ share()" vertex="1">
      <mxGeometry height="24" width="190" y="154" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-m3" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ export()" vertex="1">
      <mxGeometry height="24" width="190" y="178" as="geometry" />
    </mxCell>
    <mxCell id="TravelPlan-m4" parent="TravelPlan" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ markAsFavorite()" vertex="1">
      <mxGeometry height="24" width="190" y="202" as="geometry" />
    </mxCell>
    <mxCell id="Itinerary" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="Itinerary" vertex="1">
      <mxGeometry height="130" width="190" x="988" y="348" as="geometry" />
    </mxCell>
    <mxCell id="Itinerary-a1" parent="Itinerary" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="generatedAt" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="Itinerary-a2" parent="Itinerary" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="isEdited" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="Itinerary-div" parent="Itinerary" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="Itinerary-m1" parent="Itinerary" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ view()" vertex="1">
      <mxGeometry height="24" width="190" y="82" as="geometry" />
    </mxCell>
    <mxCell id="Itinerary-m2" parent="Itinerary" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ edit()" vertex="1">
      <mxGeometry height="24" width="190" y="106" as="geometry" />
    </mxCell>
    <mxCell id="ItineraryDay" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="ItineraryDay" vertex="1">
      <mxGeometry height="106" width="190" x="988" y="558" as="geometry" />
    </mxCell>
    <mxCell id="ItineraryDay-a1" parent="ItineraryDay" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="dayNumber" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="ItineraryDay-a2" parent="ItineraryDay" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="date" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="ItineraryDay-div" parent="ItineraryDay" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="ItineraryDay-m1" parent="ItineraryDay" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ reorder()" vertex="1">
      <mxGeometry height="24" width="190" y="82" as="geometry" />
    </mxCell>
    <mxCell id="Activity" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="Activity" vertex="1">
      <mxGeometry height="202" width="190" x="976" y="748" as="geometry" />
    </mxCell>
    <mxCell id="Activity-a1" parent="Activity" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="name" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="Activity-a2" parent="Activity" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="description" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="Activity-a3" parent="Activity" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="timeOfDay" vertex="1">
      <mxGeometry height="24" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="Activity-a4" parent="Activity" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="duration" vertex="1">
      <mxGeometry height="24" width="190" y="98" as="geometry" />
    </mxCell>
    <mxCell id="Activity-div" parent="Activity" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="122" as="geometry" />
    </mxCell>
    <mxCell id="Activity-m1" parent="Activity" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ swap()" vertex="1">
      <mxGeometry height="24" width="190" y="130" as="geometry" />
    </mxCell>
    <mxCell id="Activity-m2" parent="Activity" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ remove()" vertex="1">
      <mxGeometry height="24" width="190" y="154" as="geometry" />
    </mxCell>
    <mxCell id="Activity-m3" parent="Activity" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ viewDetails()" vertex="1">
      <mxGeometry height="24" width="190" y="178" as="geometry" />
    </mxCell>
    <mxCell id="Route" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="Route" vertex="1">
      <mxGeometry height="106" width="190" x="522" y="558" as="geometry" />
    </mxCell>
    <mxCell id="Route-a1" parent="Route" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="totalDistance" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="Route-a2" parent="Route" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="estimatedTime" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="Route-div" parent="Route" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="Route-m1" parent="Route" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ optimize()" vertex="1">
      <mxGeometry height="24" width="190" y="81" as="geometry" />
    </mxCell>
    <mxCell id="Location" parent="1" style="swimlane;fontStyle=1;align=center;startSize=26;fillColor=#ffffff;strokeColor=#000000;fontColor=#000000;fontSize=13;" value="Location" vertex="1">
      <mxGeometry height="178" width="190" x="522" y="760" as="geometry" />
    </mxCell>
    <mxCell id="Location-a1" parent="Location" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="name" vertex="1">
      <mxGeometry height="24" width="190" y="26" as="geometry" />
    </mxCell>
    <mxCell id="Location-a2" parent="Location" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="address" vertex="1">
      <mxGeometry height="24" width="190" y="50" as="geometry" />
    </mxCell>
    <mxCell id="Location-a3" parent="Location" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="latitude" vertex="1">
      <mxGeometry height="24" width="190" y="74" as="geometry" />
    </mxCell>
    <mxCell id="Location-a4" parent="Location" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="longitude" vertex="1">
      <mxGeometry height="24" width="190" y="98" as="geometry" />
    </mxCell>
    <mxCell id="Location-a5" parent="Location" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#000000;html=1;" value="openingHours" vertex="1">
      <mxGeometry height="24" width="190" y="122" as="geometry" />
    </mxCell>
    <mxCell id="Location-div" parent="Location" style="line;strokeColor=#000000;fillColor=none;html=1;strokeWidth=1;" vertex="1">
      <mxGeometry height="8" width="190" y="146" as="geometry" />
    </mxCell>
    <mxCell id="Location-m1" parent="Location" style="text;strokeColor=none;fillColor=none;align=left;spacingLeft=8;overflow=hidden;fontColor=#0066cc;html=1;" value="+ getDetails()" vertex="1">
      <mxGeometry height="24" width="190" y="153" as="geometry" />
    </mxCell>
    <mxCell id="e-user-req" edge="1" parent="1" source="User" style="edgeStyle=orthogonalEdgeStyle;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" target="TripRequest" value="submits">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e-req-pref" edge="1" parent="1" source="TripRequest" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" target="TravelPreference" value="specifies">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e-req-gen" edge="1" parent="1" source="TripRequest" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=classic;endFill=1;html=1;strokeColor=#000000;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" target="GenAIService" value="sends to">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e-gen-plan" edge="1" parent="1" source="GenAIService" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=classic;endFill=1;html=1;strokeColor=#000000;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" value="generates">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="929" y="132" />
          <mxPoint x="929" y="130" />
          <mxPoint x="990" y="130" />
        </Array>
        <mxPoint x="990" y="130" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="e-plan-itin" edge="1" parent="1" source="TravelPlan-m4" style="edgeStyle=orthogonalEdgeStyle;startArrow=diamond;startFill=1;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" value="has">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1080" y="259" />
          <mxPoint x="1080" y="348" />
        </Array>
        <mxPoint x="790" y="256" as="sourcePoint" />
        <mxPoint x="1080" y="348" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="e-itin-day" edge="1" parent="1" source="Itinerary" style="edgeStyle=orthogonalEdgeStyle;startArrow=diamond;startFill=1;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" target="ItineraryDay" value="contains">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e-day-act" edge="1" parent="1" source="ItineraryDay" style="edgeStyle=orthogonalEdgeStyle;startArrow=diamond;startFill=1;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" value="schedules">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1083" y="748" />
        </Array>
        <mxPoint x="1083" y="748" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="e-act-loc" edge="1" parent="1" source="Activity" style="edgeStyle=orthogonalEdgeStyle;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" target="Location" value="at">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e-day-route" edge="1" parent="1" source="ItineraryDay" style="edgeStyle=orthogonalEdgeStyle;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" target="Route" value="follows">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e-route-loc" edge="1" parent="1" source="Route" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" target="Location" value="connects">
      <mxGeometry relative="1" as="geometry" />
    </mxCell>
    <mxCell id="e-user-saves" edge="1" parent="1" source="User" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=1 2;endArrow=open;endFill=0;html=1;strokeColor=#000000;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" target="TravelPlan" value="saves / favorites">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="165" y="450" />
          <mxPoint x="665" y="450" />
          <mxPoint x="665" y="260" />
          <mxPoint x="960" y="260" />
          <mxPoint x="960" y="146" />
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="m1-s" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="18" x="260" y="110" as="geometry" />
    </mxCell>
    <mxCell id="m1-t" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="0..*" vertex="1">
      <mxGeometry height="20" width="30" x="350" y="110" as="geometry" />
    </mxCell>
    <mxCell id="m2-s" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="18" x="474" y="188" as="geometry" />
    </mxCell>
    <mxCell id="m2-t" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1..*" vertex="1">
      <mxGeometry height="20" width="30" x="474" y="259" as="geometry" />
    </mxCell>
    <mxCell id="m9-s" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1..*" vertex="1">
      <mxGeometry height="20" width="30" x="621" y="739" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-3" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="18" x="1085" y="270" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-4" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="18" x="1085" y="316" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-5" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="18" x="1085" y="488" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-6" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1..*" vertex="1">
      <mxGeometry height="20" width="18" x="1085" y="531" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-7" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="18" x="1085" y="675" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-8" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1..*" vertex="1">
      <mxGeometry height="20" width="18" x="1088" y="727" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-9" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="18" x="720" y="860" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-10" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="0..*" vertex="1">
      <mxGeometry height="20" width="18" x="950" y="860" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-12" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="30" x="622" y="675" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-13" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#3a3a3a;fontSize=11;" value="1" vertex="1">
      <mxGeometry height="20" width="30" x="170" y="237" as="geometry" />
    </mxCell>
    <mxCell id="r0Cbf4jgCR6a7Rn8vy5o-14" parent="1" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#000000;fontSize=11;" value="0..*" vertex="1">
      <mxGeometry height="20" width="30" x="929" y="200" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
